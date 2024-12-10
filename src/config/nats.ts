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
  Logger.info('Starting event subscription for link.event.>');
  
  const subscription = natsConnection.subscribe('link.event.>');
  Logger.info('Subscription created', { 
    subject: subscription.getSubject(),
    delivered: subscription.getProcessed(),
    pending: subscription.getPending()
  });
  
  // 구독이 활성화되었는지 확인
  if (subscription.getProcessed() === undefined) {
    Logger.warn('Subscription might not be active');
  }

  try {
    for await (const msg of subscription) {
      Logger.info('Raw message received', { 
        subject: msg.subject,
        hasData: !!msg.data,
        size: msg.data?.length
      });

      try {
        const decodedData = sc.decode(msg.data);
        Logger.info('이벤트 디코딩 완료', { decodedData });
        
        const payload = JSON.parse(decodedData);
        Logger.info('이벤트 수신', { 
          topic: msg.subject, 
          data : payload
        });
        await processEvent(msg.subject, payload);
        
      } catch (error) {
        Logger.error('이벤트 처리 실패', { 
          error,
          subject: msg.subject
        });
      }
    }
  } catch (error) {
    Logger.error('구독 중 에러가 발생했습니다.', { error });
    setTimeout(() => subscribeToAllEvents(), 5000);
  }
};


// 구독 시작 시 에러 처리 추가
export const startSubscription = async () => {
  try {
    await subscribeToAllEvents();
  } catch (error) {
    Logger.error('구독에 실패했습니다.', { error });
    setTimeout(() => startSubscription(), 5000);
  }
};