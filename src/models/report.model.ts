import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  reporter_id : { type: Number, required: true},
  target_id : { type: Number, required: true},
  title : { type: String, required: true},
  content : { type: String, required: true},
  report_files : { type: [String], required: false},
  report_type : { type: String, required: true},
  timestamp : { type: Date, required: true},
  created_at : { type: Date, default: Date.now},
  updated_at : { type: Date, default: null},
  deleted_at : { type: Date, default: null},
});

export const Report = mongoose.model("Report", reportSchema);
export type ReportDocument = mongoose.InferSchemaType<typeof reportSchema>;