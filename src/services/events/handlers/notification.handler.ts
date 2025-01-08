import { Logger } from "../../../utils/logger";
import * as notificationType from "../types/notification.type";
import * as notificationRepository from "../../../repositories/notification.repository";


export const handleUserInviteRequest = async (data: notificationType.UserInviteRequestEvent) => {
  try {
    const notificationData : notificationType.UserInviteRequestEvent = {
      topic : data.topic,
      payload :{
        doc_id : data.payload.doc_id,  
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
  } catch(err) {
    Logger.error('사용자 초대 요청 로그 저장 실패', { err,  data });
  }
}

export const handleUserInviteResponse = async (data: notificationType.UserInviteResponseEvent) => {
  try {
    const notificationData : notificationType.UserInviteResponseEvent = {
      topic : data.topic,
      payload : {
        doc_id : data.payload.doc_id,
        target_doc_id : data.payload.target_doc_id,
        target_id : data.payload.target_id,
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

    await notificationRepository.saveUserInviteResponse(notificationData);
  } catch(err) {
    Logger.error('사용자 초대 응답 로그 저장 실패', { err, data });
  }
}

export const handleNotificationRead = async (data: notificationType.NotificationReadEvent) => {
  try {
    await notificationRepository.updateNotificationRead(data);
  } catch(err) {
    Logger.error('알림 읽음 처리 실패', { err, data });
  }
}

export const handleUserMention = async (data: notificationType.UserMentionEvent) => {
  try {
    await notificationRepository.saveUserMention(data);
  } catch(err) {
    Logger.error('사용자 언급 로그 저장 실패', { err, data });
  }
}