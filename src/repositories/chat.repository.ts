import { ChatMessage } from "../models/chat.model";
import * as chatType from "../services/events/types/chat.type";

export const saveChatMessage = async (chatMessage: chatType.ChatMessagePayload) => {

  const chatMessageData = {
    chat_room_id : chatMessage.chat_room_id,
    sender_id : chatMessage.sender_id,
    sender_name : chatMessage.sender_name,
    sender_email : chatMessage.sender_email,
    content : chatMessage.content,
    unread_by : chatMessage.unread_by,
    unread_count : chatMessage.unread_count,
    created_at : new Date(chatMessage.created_at),
  }
  await ChatMessage.create(chatMessageData);
}
