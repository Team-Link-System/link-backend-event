export interface Event {
  topic: string;
  eventId?: string;
  payload: any;
}

export interface UserSignInEvent {
    userId : number;
    username?: string;
    email?: string;
    ipAddress?: string;
    device?: string;
    sessionId?: string;
    timestamp : string; //TODO format은 yyyy-MM-dd HH:mm:ss 로  kst로 저장
}

export interface UserSignInAudit extends Event {
  topic: string;
  payload: UserSignInEvent;
}
