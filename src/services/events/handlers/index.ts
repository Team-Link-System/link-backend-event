import { handleUserLogin } from "./user.handler";
export const handlers: Record<string, (data: any) => Promise<void>> = {
  "link.event.user.signin" : handleUserLogin,
  // "link.event.user.signup" : handleUserSignup,
  // "link.event.user.logout" : handleUserLogout,
  // "link.event.user.invite.request" : handleUserInviteRequest, //초대
  // "link.event.user.invite.response" : handleUserInviteResponse, //초대에 대한 응답 
}