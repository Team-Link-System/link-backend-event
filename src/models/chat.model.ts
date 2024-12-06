import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chat_room_id : { type: Number, required: true},
  sender_id : { type: Number, required: true},
  sender_name : { type: String, required: true},
  sender_email : { type: String, required: true},
  sender_image : { type: String, required: false},
  content : { type: String, required: true},
  created_at : { type: Date, default: Date.now},
  unread_by : [{ type: Number}],
  unread_count : { type: Number, default: 0},
}, {timestamps : true});


export const ChatMessage = mongoose.model('ChatMessage', chatSchema);
export type ChatDocument = mongoose.InferSchemaType<typeof chatSchema>;