import { Notification } from "../models/notification.model";
import * as notificationType from "../services/events/types/notification.type";
import { Logger } from "../utils/logger";
export const saveUserInviteRequest = async (data: notificationType.UserInviteRequestEvent) => {
  try {
    await Notification.create(data);
    Logger.info('사용자 초대 요청 로그 저장 성공', { data });
  } catch(err) {
    Logger.error('사용자 초대 요청 로그 저장 실패', { err, data });
  }
}