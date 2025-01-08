export interface ReportEvent {
  topic: string;
  eventId?: string;
  payload: ReportPayload;
}

export interface ReportPayload {
  reporter_id: number;
  target_id: number;
  title: string;
  content: string;
  report_type: string;
  report_files: string[];
  timestamp: string;
}

export interface CreateReportEvent extends ReportEvent {
  topic: string;
  payload: ReportPayload;
}

