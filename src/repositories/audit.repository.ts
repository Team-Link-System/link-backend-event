import { Audit } from "../models/audit.model";

export const saveUserSignInAudit = async (data: any) => {
  const auditData = {
    topic : data.topic,
    action : "signIn",
    payload : data.payload,
  }
  await Audit.create(auditData);
}

//TODO 출퇴근 시간 기록
export const saveUserAttendanceAudit = async (data: any) => {
  const auditData = {
    topic : data.topic,
    action : "checkIn ", //출근 
    payload : data.payload,
  }
  await Audit.create(auditData);
}

//TODO 퇴근 시간 기록
export const saveUserLeaveAudit = async (data: any) => {
  const auditData = {
    topic : data.topic,
    action : "CheckOut", //퇴근
    payload : data.payload,
  }
  await Audit.create(auditData);
}