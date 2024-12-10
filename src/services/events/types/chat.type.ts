export interface ChatMessagePayload {
    chat_room_id : number; // 스네이크 케이스
    sender_id : number;
    sender_name : string;
    sender_email : string;
    content : string;
    created_at : string;
}

export interface ChatMessageEvent {
  topic : string;
  eventId : string;
  payload : ChatMessagePayload;
}