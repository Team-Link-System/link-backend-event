import { Logger } from "../../../utils/logger";
import * as chatRepository from "../../../repositories/chat.repository";
import * as chatType from "../types/chat.type";

export const handleChatMessage = async (data: chatType.ChatMessageEvent) => {
  try{
    await chatRepository.saveChatMessage(data.payload); 
    Logger.info('채팅 메시지 저장 성공', { payload : data.payload });
  } catch(err){
    Logger.error('채팅 메시지 저장 실패', { err, payload : data.payload });
  }
  
}