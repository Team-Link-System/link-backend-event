import { Logger } from "../../utils/logger";
import { TOPICS } from "../../../constants/topics";
import { UserLoginEvent } from "../../../types/events";

export const handleUserLogin = async (data: UserLoginEvent) => {
  Logger.info(`Received message on ${TOPICS.USER.LOGIN} topic:`, data);
}