import { Cron } from "croner";
import redis from "../../config/redis";
import db from "../../config/postgres";
import { Logger } from "../logger";
import { format, subWeeks, subMonths } from "date-fns";
import PostStats from "../../models/poststat.model";
// 포스트 조회수 동기화 크론 작업
export function scheduleViewCountSync() {
  new Cron("*/5 * * * *", async () => { // 5분마다 실행
    Logger.info("Redis에서 조회수를 PostgreSQL로 동기화 중...");

    try {
      const keys = await redis.keys("post:views:*");

      if (keys.length === 0) {
        Logger.info("업데이트할 조회수 없음");
        return;
      }

      const client = await db.connect();
      try {
        await client.query("BEGIN");

        const multi = redis.multi(); // redis 트랜잭션

        for (const key of keys) {
          const postId = key.split(":")[2]; // post:views:123 → 123
          const views = await redis.get(key);

          if (views) {
            const result = await client.query(
              "UPDATE posts SET views = views + $1 WHERE id = $2 RETURNING views",
              [parseInt(views, 10), postId]
            );

            // 업데이트된 조회수 로그 출력
            Logger.info(`게시물 ${postId} 조회수 업데이트됨: ${result.rows[0].views}`);

            multi.del(key); // PostgreSQL 반영 후 Redis에서 삭제
          }
        }

        await multi.exec(); // 트랜잭션 실행
        await client.query("COMMIT"); // 트랜잭션 커밋
        Logger.info("조회수 동기화 완료");
      } catch (error) {
        await client.query("ROLLBACK"); // 오류 발생 시 롤백
        Logger.error("조회수 동기화 실패 (롤백됨):", error);
      } finally {
        client.release(); // 커넥션 반환
      }
    } catch (error) {
      Logger.error("조회수 동기화 실패:", error);
    }
  });

  Logger.info("ViewCount Sync Cron Job Successfully Started");
}

async function generatePostStats(period: "week" | "month", dateFunc: Function, interval: string) {
  Logger.info(`${period.toUpperCase()} 게시물 통계 크론 작업 시작`);

  try {
    const client = await db.connect();
    try {
      const visibilityTypes = ["public", "company", "department"];
      const startDate = period === "week" 
        ? format(dateFunc(new Date(), 1), "yyyy-MM-dd") 
        : format(dateFunc(new Date(), 1), "yyyy-MM-01"); // 월간은 무조건 1일

      const TOP_POSTS_LIMIT = 50;
      const sqlPeriod = period === "week" ? "week" : "month"; // `DATE_TRUNC()`에 사용될 기간
      const dateCondition = period === "week"
        ? "p.created_at >= NOW() - INTERVAL '7 days'" // 주간 조회
        : "p.created_at >= DATE_TRUNC('month', NOW() - INTERVAL '1 month') AND p.created_at < DATE_TRUNC('month', NOW())"; // 

      await Promise.all(
        visibilityTypes.map(async (visibility) => {
          const result = await client.query(
            `
            WITH ranked_posts AS (
              SELECT 
                TO_CHAR(DATE_TRUNC('${sqlPeriod}', NOW() - INTERVAL '${interval}')::DATE, 'YYYY-MM-01') AS start_date,
                p.id AS post_id,
                p.user_id,
                p.title,
                p.company_id,
                p.is_anonymous,
                p.created_at,
                p.updated_at,
                COALESCE(SUM(p.views), 0) AS total_views,
                COALESCE(COUNT(DISTINCT l.id), 0) AS total_likes,
                COALESCE(COUNT(DISTINCT c.id), 0) AS total_comments,
                (COALESCE(SUM(p.views), 0) * 1) + 
                (COALESCE(COUNT(DISTINCT l.id), 0) * 5) + 
                (COALESCE(COUNT(DISTINCT c.id), 0) * 10) AS score,
                ROW_NUMBER() OVER (ORDER BY (COALESCE(SUM(p.views), 0) * 1) + 
                                          (COALESCE(COUNT(DISTINCT l.id), 0) * 5) + 
                                          (COALESCE(COUNT(DISTINCT c.id), 0) * 10) DESC) AS rank
              FROM posts p
              LEFT JOIN likes l ON l.target_id = p.id 
                  AND l.target_type = 'post'
                  AND l.created_at >= NOW() - INTERVAL '${interval}'
              LEFT JOIN comments c ON c.post_id = p.id 
                  AND c.created_at >= NOW() - INTERVAL '${interval}'
              WHERE ${dateCondition}  
              AND p.visibility = $1
              GROUP BY p.id, p.company_id
              ORDER BY score DESC
              LIMIT $2
            )
            SELECT * FROM ranked_posts;
            `,
            [visibility, TOP_POSTS_LIMIT]
          );

          const posts = result.rows.map((row) => ({
            rank: row.rank,
            postId: row.post_id,
            userId: row.user_id,
            title: row.title,
            companyId: row.company_id,
            isAnonymous: row.is_anonymous,
            visibility: visibility,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            totalViews: row.total_views,
            totalLikes: row.total_likes,
            totalComments: row.total_comments,
            score: row.score,
          }));

      
          await PostStats.updateOne(
            { startDate, period, visibility },
            { 
              $set: { startDate, period, visibility, posts },
              $setOnInsert: { createdAt: new Date() } 
            },
            { upsert: true }
          );

          Logger.info(`${posts.length}개의 ${visibility} 게시물 통계 저장 완료`);
        })
      );
    } finally {
      client.release();
    }
  } catch (error) {
    Logger.error(` ${period.toUpperCase()} 게시물 통계 실패:`, error);
  }
}

export function schedulePostStatWeekly() {
  new Cron("0 0 0 * * 1", () => generatePostStats("week", subWeeks, "7 days")); // 매주 월요일 0시 0분 실행
}

export function schedulePostStatMonthly() {
  new Cron("0 0 0 1 * *", () => generatePostStats("month", subMonths, "1 month")); // 매월 1일 0시 0분 실행
  // new Cron("* * * * * *", () => generatePostStats("month", subMonths, "1 month")); // 테스트
}
