import { ChatMessage } from "../models/chat.model";
import * as chatType from "../services/events/types/chat.type";

export const saveChatMessage = async (chatMessage: chatType.ChatMessagePayload) => {

  const chatMessageData = {
    chat_room_id : chatMessage.chat_room_id,
    sender_id : chatMessage.sender_id,
    sender_name : chatMessage.sender_name,
    sender_email : chatMessage.sender_email,
    content : chatMessage.content,
  }
  await ChatMessage.create(chatMessageData);
}
