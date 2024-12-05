import { connect, NatsConnection, StringCodec} from "nats";
import { Logger } from "../utils/logger";
import { processEvent } from "../services/events/eventprocessor";

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

export const subscribeToAllEvents = async () => {
  if (!natsConnection) throw new Error('NATS connection not established');
  
  const sc = StringCodec();
  const subscription = natsConnection.subscribe('link.event.>'); // 와일드카드 구독

  console.log('NATS 이벤트 구독 성공: link.event.>');
  
  for await (const msg of subscription) {
    const topic = msg.subject; // 메시지의 토픽
    const payload = JSON.parse(sc.decode(msg.data)); // 메시지 디코딩

    try {
      await processEvent(topic, payload); // 이벤트 처리
    } catch (error) {
      Logger.error(`NATS 이벤트 처리 실패: ${topic}`, error);
    }
  }
};