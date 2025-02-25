import { Logger } from "../../../utils/logger";
import * as reportRepository from "../../../repositories/report.repository";
import * as reportType from "../types/report.type";
import { publishEvent } from "../../../config/nats";

export const handleReportCreate = async (data: reportType.CreateReportEvent) => {
  try {

    const reportData : reportType.CreateReportEvent = {
      topic : data.topic,
      payload : {
        reporter_id : data.payload.reporter_id,
        target_id : data.payload.target_id,
        title : data.payload.title,
        content : data.payload.content,
        report_type : data.payload.report_type,
        report_files : data.payload.report_files,
        timestamp : data.payload.timestamp,
      }
    }

    await reportRepository.saveReport(reportData);

  } catch(err) {
    Logger.error('신고 저장 실패', { err,  data });
  }
}