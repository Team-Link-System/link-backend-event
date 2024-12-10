export interface NotificationEvent {
  topic: string;
  eventId?: string;
  payload: any;
}

export interface UserInviteRequestPayload {
  sender_id : number;
  receiver_id : number;
  title : string;
  status : string;
  content : string;
  alarm_type : string;
  is_read? : boolean;
  invite_type? : string;
  company_id? : number;
  company_name? : string;
  department_id? : number;
  department_name? : string;
  timestamp? : string;
}

export interface UserInviteRequestEvent extends NotificationEvent {
  topic: string;
  payload: UserInviteRequestPayload;
}