import { connectMongo } from "./db";
import { connectNats } from "./nats";

export const initConfig = async () => {
  await connectMongo();
  await connectNats();
}