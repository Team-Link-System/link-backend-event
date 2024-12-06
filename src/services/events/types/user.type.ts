export interface UserLoginEvent {
  topic: string;
  eventId : string;
  payload: {
    userId : number;
    username?: string;
    email?: string;
    ipAddress?: string;
    device?: string;
    sessionId?: string;
  }
  timestamp : string; //TODO format은 yyyy-MM-dd HH:mm:ss 로  kst로 저장
}