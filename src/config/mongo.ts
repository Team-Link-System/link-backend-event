import mongoose from "mongoose";
import { Logger } from "../utils/logger";
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    Logger.info("MongoDB 연결 성공");
  } catch(err){
    Logger.error("MongoDB 연결 실패:",err);
    process.exit(1);
  }
}

export const closeMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    Logger.info("MongoDB 연결 종료 성공");
  } catch(err) {
    Logger.error("MongoDB 연결 종료 실패:", err);
    throw err;
  }
};