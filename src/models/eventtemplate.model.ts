//TODO 이벤트 템플릿 구현
import mongoose from "mongoose";

const eventTemplateSchema = new mongoose.Schema({
  topic : { type: String, required: true, unique: true },
  schema : { type: Object, required: true },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
})

export const EventTemplate = mongoose.model("EventTemplate", eventTemplateSchema);