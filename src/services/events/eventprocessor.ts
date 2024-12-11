import { handlers } from "./handlers";
import { Logger } from "../../utils/logger";

export const processEvent = async(topic: string, data: any) => {
 const handler = handlers[topic as keyof typeof handlers];
 if (!handler) {
  Logger.warn(`이벤트 처리 실패: ${topic}`);
  return;
} 
  await handler(data);
}