import { connect, NatsConnection} from "nats";
import { Logger } from "../utils/logger";

let natsConnection : NatsConnection | null = null;

export const connectNats = async() : Promise<NatsConnection> => {
  try {
    natsConnection = await connect({servers : process.env.NATS_URI as string});
    Logger.info("NATS 연결 성공");
    return natsConnection;
  } catch(err){
    Logger.error("NATS 연결 실패:",err);
    process.exit(1);
  }
}

export const closeNatsConnection = async(): Promise<void> => {
  try {
    if (natsConnection) {
      await natsConnection.drain();
      await natsConnection.close();
      Logger.info("NATS 연결 종료 성공");
    }
  } catch(err) {
    Logger.error("NATS 연결 종료 실패:", err);
    throw err;
  }
};

export const getNatsConnection = (): NatsConnection => {
  if (!natsConnection) {
    Logger.error("NATS connection not initialized");
    throw new Error("NATS connection not initialized");
  }
  return natsConnection;
};