import { Logger } from "../../../utils/logger";
import * as auditRepository from "../../../repositories/audit.repository";
import * as reportType from "../types/report.type";
import { publishEvent } from "../../../config/nats";

export const handleReportCreate = async (data: reportType.CreateReportEvent) => {
  try {
    await auditRepository.saveReportAudit(data);

    const { reporter_id, target_id, title, content, report_files, timestamp } = data.payload;

    const auditEvent = {
      topic : "audit.report.create",
      payload : { reporter_id, target_id, title, content, report_files, timestamp },
      action : "report",
      message : `${reporter_id}님이 ${target_id}님을 신고하셨습니다.`
    }
    await publishEvent(auditEvent.topic, auditEvent);
  } catch(err) {
    Logger.error('신고 저장 실패', { err,  data });
  }
}