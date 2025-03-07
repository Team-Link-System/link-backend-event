import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  doc_id : { type: String, required: true, index: true}, //TODO uuid로 변경
  topic : { type: String, required: true, index: true},
  sender_id : { type: Number, required: true},
  receiver_id : { type: Number, required: true},
  content : { type: String, required: true},
  title : { type: String, required: true},
  status : { type: String, required: false},
  alarm_type : { type: String, required: true},
  is_read : { type: Boolean, required: false},
  invite_type : { type: String, required: false},
  request_type : { type: String, required: false},
  company_id : { type: Number, required: false},
  company_name : { type: String, required: false},
  department_id : { type: Number, required: false},
  department_name : { type: String, required: false},
  target_type : { type: String, required: false},
  target_id : { type: mongoose.Schema.Types.Mixed, required: false}, // Number 혹은 String
  timestamp : { type: Date, default: Date.now},
  created_at : { type: Date, default: Date.now},
  updated_at : { type: Date, default: null},
  deleted_at : { type: Date, default: null},
}); 

export const Notification = mongoose.model("Notification", notificationSchema);
export type NotificationDocument = mongoose.InferSchemaType<typeof notificationSchema>;