import { Cron } from "croner";
import redis from "../../config/redis";
import db from "../../config/postgres";
import { Logger } from "../logger";

// 포스트 조회수 동기화 크론 작업
export function scheduleViewCountSync() {
  new Cron("*/5 * * * *", async () => { // 5분마다 실행
    Logger.info("Redis에서 조회수를 PostgreSQL로 동기화 중...");

    try {
      const keys = await redis.keys("post:views:*");

      if (keys.length === 0) {
        Logger.info("⏳ 업데이트할 조회수 없음");
        return;
      }

      const client = await db.connect();
      try {
        await client.query("BEGIN");

        for (const key of keys) {
          const postId = key.split(":")[2]; // post:views:123 → 123
          const views = await redis.get(key);

          if (views) {
            // `views` 필드만 원자적으로 업데이트 (다른 컬럼 영향 방지)
            const result = await client.query(
              "UPDATE posts SET views = views + $1 WHERE id = $2 RETURNING views",
              [parseInt(views, 10), postId]
            );

            // 업데이트된 조회수 로그 출력
            Logger.info(`게시물 ${postId} 조회수 업데이트됨: ${result.rows[0].views}`);

            await redis.del(key); // PostgreSQL 반영 후 Redis에서 삭제
          }
        }

        await client.query("COMMIT"); // 트랜잭션 커밋
        Logger.info("조회수 동기화 완료");
      } catch (error) {
        await client.query("ROLLBACK"); // 오류 발생 시 롤백
        Logger.error("조회수 동기화 실패 (롤백됨):", error);
      } finally {
        client.release(); // ✅ 커넥션 반환
      }
    } catch (error) {
      Logger.error("조회수 동기화 실패:", error);
    }
  });

  Logger.info("ViewCount Sync Cron Job Successfully Started");
}
