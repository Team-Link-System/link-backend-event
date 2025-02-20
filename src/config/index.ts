import { connectMongo, closeMongoDB } from "./mongo";
import { connectNats, closeNatsConnection } from "./nats";
import { Logger } from "../utils/logger";
import { connectRedis, closeRedis } from "./redis";
import { connectPostgres, closePostgres } from "./postgres";
import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
dotenv.config({ path: path.join(__dirname, `../../${envFile}`) });



export const initConfig = async () => {
  //DOTenv 환경변수 설정
  
  await connectMongo();
  await connectNats();
  await connectRedis();
  await connectPostgres();
}

export const shutdown = async () => {
  Logger.info('Shutting down gracefully...');
  await Promise.all([
    closeMongoDB(),
    closeNatsConnection(),
    closeRedis(),
    closePostgres(),
  ]);
  Logger.info("All connections closed. Goodbye!");
};
