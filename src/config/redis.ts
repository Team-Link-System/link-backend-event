import Redis from "ioredis";
import { Logger } from "../utils/logger";

// Redis 인스턴스 생성 (자동 연결됨)
export const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});




export const connectRedis = async () => {
  try {
    Logger.info(" Redis 연결 성공");
  } catch(err) {
    Logger.error(" Redis 연결 실패:", err);
    process.exit(-1);
  }
};

export const closeRedis = async () => {
  try {
    Logger.info(" Redis 연결 종료");
  } catch(err) {
    Logger.error(" Redis 연결 종료 실패:", err);
    throw err;
  }
};

export default redis;
