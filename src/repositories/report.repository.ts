import { Report } from "../models/report.model";
import * as reportType from "../services/events/types/report.type";
import { Logger } from "../utils/logger";

export const saveReport = async (data: reportType.CreateReportEvent) => {
  try {
    const reportData = {
      reporter_id : data.payload.reporter_id,
      target_id : data.payload.target_id,
      title : data.payload.title,
      content : data.payload.content,
      report_type : data.payload.report_type,
      report_files : data.payload.report_files,
      timestamp : data.payload.timestamp,
    }
    await Report.create(reportData);
  } catch(err) {
    Logger.error('[Repository]신고 저장 실패', { err, data });
  }
}