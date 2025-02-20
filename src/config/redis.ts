import Redis from "ioredis";
import { Logger } from "../utils/logger";

// Redis 인스턴스 생성 (자동 연결됨)
const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

redis.on("connect", () => {
  Logger.info(" Redis 연결 성공");
});

redis.on("error", (err) => {
  Logger.error(" Redis 오류 발생:", err);
  process.exit(-1);
});


export const connectRedis = async () => {
  Logger.info(" Redis가 이미 연결된 상태입니다.");
};

export const closeRedis = async () => {
  await redis.quit();
  Logger.info(" Redis 연결 종료");
};

export default redis;
