import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
  topic : { type: String, required: true, index: true},
  action : { type: String, required: true},
  payload : { type: mongoose.Schema.Types.Mixed, required: true},
}, {timestamps : true}); 

export const Audit = mongoose.model("Audit", auditSchema);
