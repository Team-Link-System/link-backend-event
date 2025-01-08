import { handlers } from "./handlers";
import { Logger } from "../../utils/logger";

export const processEvent = async(topic: string, data: any) => {
 const handler = handlers[topic as keyof typeof handlers];
 if (!handler) {
  return;
} 
  await handler(data);
}