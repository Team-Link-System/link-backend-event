import { Notification } from "../models/notification.model";
import * as notificationType from "../services/events/types/notification.type";
import { Logger } from "../utils/logger";
export const saveUserInviteRequest = async (data: notificationType.UserInviteRequestEvent) => {
  try {
    const notificationData = {
      doc_id : data.payload.doc_id,
      topic : data.topic,
      sender_id : data.payload.sender_id,
      receiver_id : data.payload.receiver_id,
      content : data.payload.content,
      title : data.payload.title,
      status : data.payload.status,
      alarm_type : data.payload.alarm_type,
      invite_type : data.payload.invite_type,
      company_id : data.payload.company_id,
      company_name : data.payload.company_name,
      department_id : data.payload.department_id,
      department_name : data.payload.department_name,
      is_read : data.payload.is_read,
      timestamp : data.payload.timestamp,
    }

    await Notification.create(notificationData);
    Logger.info('[Repository]사용자 초대 요청 로그 저장 성공', { data :notificationData });
  } catch(err) {
    Logger.error('[Repository]사용자 초대 요청 로그 저장 실패', { err, data });
  }
}

export const saveUserInviteResponse = async (data: notificationType.UserInviteResponseEvent) => {
  try {

    const notificationData = {
      doc_id : data.payload.doc_id,
      target_doc_id : data.payload.target_doc_id,
      topic : data.topic,
      sender_id : data.payload.sender_id,
      receiver_id : data.payload.receiver_id,
      content : data.payload.content,
      title : data.payload.title,
      status : data.payload.status,
      alarm_type : data.payload.alarm_type,
      invite_type : data.payload.invite_type,
      company_id : data.payload.company_id,
      company_name : data.payload.company_name,
      department_id : data.payload.department_id,
      department_name : data.payload.department_name,
      is_read : data.payload.is_read,
      timestamp : data.payload.timestamp,
    }

    await Notification.create(notificationData);
    //TODO 기존 초대 요청 로그 status 변경 REJECTED
    await Notification.updateOne({doc_id: data.payload.target_doc_id}, {status : data.payload.status, is_read : true});
    Logger.info('[Repository]사용자 초대 응답 로그 저장 성공', { data :notificationData });
  } catch(err) {
    Logger.error('[Repository]사용자 초대 응답 로그 저장 실패', { err, data });
  }
}


export const updateNotificationRead = async (data: notificationType.NotificationReadEvent) => {
  try {
    await Notification.updateOne({doc_id: data.payload.doc_id}, {is_read : true});
    Logger.info('[Repository]알림 읽음 처리 성공', { data });
  } catch(err) {
    Logger.error('[Repository]알림 읽음 처리 실패', { err, data });
  }
}