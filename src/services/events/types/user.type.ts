export interface UserLoginEvent {
  topic: string;
  eventId : string;
  timestamp : string; 
  payload: {
    userId : number;
    ipAddress?: string;
    device?: string;
    sessionId?: string;
  }
}