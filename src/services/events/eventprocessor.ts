import { handlers } from "./handlers";
import { Logger } from "../../utils/logger";

export const processEvent = async(topic: string, data: any) => {
  console.log(topic);
 const handler = handlers[topic as keyof typeof handlers];
 console.log(handlers[topic as keyof typeof handlers]);
 if (!handler) {
  Logger.warn(`이벤트 처리 실패: ${topic}`);
  return;
} 

console.log(data);

  Logger.info(`이벤트 처리 성공: ${topic}`);
  await handler(data);
}