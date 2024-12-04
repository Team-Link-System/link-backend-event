import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
dotenv.config({ path: path.join(__dirname, `../../${envFile}`) });

export const env = {
  PORT: parseInt(process.env.PORT || '9000', 10),
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/event-server',
  NATS_URI: process.env.NATS_URI || 'nats://localhost:4222',
}