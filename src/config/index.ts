import { connectMongo } from "./db";
import { connectNats } from "./nats";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, '../../.env.dev') });

export const initConfig = async () => {
  //DOTenv 환경변수 설정
  await connectMongo();
  await connectNats();
}