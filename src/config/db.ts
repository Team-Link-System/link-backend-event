import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB 연결 성공");
  } catch(err){
    console.error("MongoDB 연결 실패:",err);
    process.exit(1);
  }
}