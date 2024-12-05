import { connectMongo, closeMongoDB } from "./mongo";
import { connectNats, closeNatsConnection } from "./nats";
import { Logger } from "../utils/logger";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../.env.dev') });

export const initConfig = async () => {
  //DOTenv 환경변수 설정
  await connectMongo();
  await connectNats();

}

export const shutdown = async () => {
  Logger.info('Shutting down gracefully...');
  await Promise.all([
    closeMongoDB(),
    closeNatsConnection()
  ]);
  Logger.info('All connections closed. Goodbye!');
};