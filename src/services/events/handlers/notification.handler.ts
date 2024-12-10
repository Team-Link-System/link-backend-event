import { Logger } from "../../../utils/logger";
import * as notificationType from "../types/notification.type";
import * as notificationRepository from "../../../repositories/notification.repository";
export const handleUserInviteRequest = async (data: notificationType.UserInviteRequestEvent) => {
  try {
    const notificationData : notificationType.UserInviteRequestEvent = {
      topic : data.topic,
      payload :{
        sender_id : data.payload.sender_id,
        receiver_id : data.payload.receiver_id,
        content : data.payload.content,
        title : data.payload.title,
        alarm_type : data.payload.alarm_type,
        invite_type : data.payload.invite_type,
        status : data.payload.status,
        is_read : data.payload.is_read,
        timestamp : data.payload.timestamp,
      }
    }

    if (data.payload.invite_type?.toUpperCase() === "COMPANY") {
      notificationData.payload.company_id = data.payload.company_id;
      notificationData.payload.company_name = data.payload.company_name;
    } else if (data.payload.invite_type?.toUpperCase() === "DEPARTMENT") {
      notificationData.payload.department_id = data.payload.department_id;
      notificationData.payload.department_name = data.payload.department_name;
    }

    await notificationRepository.saveUserInviteRequest(notificationData);
    Logger.info('사용자 초대 요청 로그 저장 성공', {  data });
  } catch(err) {
    Logger.error('사용자 초대 요청 로그 저장 실패', { err,  data });
  }
}

export const handleUserInviteResponse = async (data: any) => {
  console.log(data);
}