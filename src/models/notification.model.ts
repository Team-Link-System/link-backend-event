import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  topic : { type: String, required: true, index: true},
  payload : { type: mongoose.Schema.Types.Mixed, required: true},
}, {timestamps : true}); 

export const Notification = mongoose.model("Notification", notificationSchema);