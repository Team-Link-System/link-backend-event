export interface Event {
  topic: string;
  eventId?: string;
  payload: any;
}

export interface UserSignInEvent {
    user_id : number;
    name?: string;
    email?: string;
    company_id?: number;
    ip_address?: string;
    device?: string;
    session_id?: string;
    timestamp : string; //TODO format은 yyyy-MM-dd HH:mm:ss 로  kst로 저장
}

export interface UserSignInAudit extends Event {
  topic: string;
  payload: UserSignInEvent;
}
