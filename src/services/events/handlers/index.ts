import { handleUserSignIn } from "./user.handler";
import { handleChatMessage } from "./chat.handler";
import * as notificationHandler from "./notification.handler";
import { handleReportCreate } from "./report.handler";

export const handlers: Record<string, (data: any) => Promise<void>> = {
  "link.event.user.signin" : handleUserSignIn,
  // "link.event.user.signup" : handleUserSignup,
  // "link.event.user.signout" : handleUserSignOut,

  //TODO 알림 관련
  "link.event.notification.mention" : notificationHandler.handleUserMention, //언급
  "link.event.notification.invite.request" : notificationHandler.handleUserInviteRequest, //초대
  "link.event.notification.invite.response" : notificationHandler.handleUserInviteResponse, //초대에 대한 응답 
  "link.event.notification.read" : notificationHandler.handleNotificationRead, //알림 읽음 처리

  
  // "link.event.user.mention" : handleUserMention, // 언급

  

  //TODO 채팅 관련
  "link.event.chat.message" : handleChatMessage,

  //TODO 신고 관련
  "link.event.report.create" : handleReportCreate,

}