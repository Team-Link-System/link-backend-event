import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chat_room_id : { type: Number, required: true},
  sender_id : { type: Number, required: true},
  sender_name : { type: String, required: true},
  sender_email : { type: String, required: true},
  content : { type: String, required: true},
  created_at : { type: Date, default: Date.now},
  updated_at : { type: Date, default: null},
  deleted_at : { type: Date, default: null},
});


export const ChatMessage = mongoose.model('Message', chatSchema);
export type ChatDocument = mongoose.InferSchemaType<typeof chatSchema>;