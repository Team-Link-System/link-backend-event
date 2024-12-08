import { handleUserSignIn } from "./user.handler";
import { handleChatMessage } from "./chat.handler";
export const handlers: Record<string, (data: any) => Promise<void>> = {
  "link.event.user.signin" : handleUserSignIn,
  // "link.event.user.signup" : handleUserSignup,
  // "link.event.user.signout" : handleUserSignOut,
  // "link.event.user.invite.request" : handleUserInviteRequest, //초대
  // "link.event.user.invite.response" : handleUserInviteResponse, //초대에 대한 응답 

  // "link.event.user.mention" : handleUserMention, // 언급

  

  //TODO 채팅 관련
  "link.event.chat.message" : handleChatMessage,

}