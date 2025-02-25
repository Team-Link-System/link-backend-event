import { Pool } from "pg";
import { Logger } from "../utils/logger";

const pool = new Pool(
    {
        host: process.env.POSTGRES_DB_HOST || "127.0.0.1",
        port: Number(process.env.POSTGRES_PORT) || 5432,
        database: process.env.POSTGRES_DB || "postgres",
        user: process.env.POSTGRES_USER || "postgres",
        password: process.env.POSTGRES_PASSWORD || "postgres", // 🔹 undefined 대신 빈 문자열 사용
        ssl: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false,
      }
);


pool.on("error", (err: Error) => {
  Logger.error("PostgreSQL 클라이언트 오류:", err);
  process.exit(-1);
});

export const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    Logger.info("PostgreSQL 연결 성공");
    client.release(); // 풀에서 연결 해제 (풀링 유지)
  } catch (err) {
    Logger.error("PostgreSQL 연결 실패:", err);
    process.exit(-1);
  }
};

export const closePostgres = async () => {
  try {
    await pool.end();
    Logger.info("PostgreSQL 연결 종료 성공");
  } catch (err) {
    Logger.error("PostgreSQL 연결 종료 실패:", err);
    throw err;
  }
};

export default pool;
