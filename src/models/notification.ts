import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  topic : { type: String, required: true, index: true},
  payload : { type: mongoose.Schema.Types.Mixed, required: true},
  timestamp : { type: Date, default: Date.now},
  service : { type: String, required: true, index: true},
  eventId : { type: String, required: true, index: true}
}, {timestamps : true}); 

export const Notification = mongoose.model("Notification", notificationSchema);