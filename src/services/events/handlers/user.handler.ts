import { Logger } from "../../../utils/logger";
import * as auditRepository from "../../../repositories/audit.repository";
import * as userType from "../types/user.type";
import { publishEvent } from "../../../config/nats";
export const handleUserSignIn = async (data: userType.UserSignInAudit) => {
  try {
    await  auditRepository.saveUserSignInAudit(data);



    const { user_id, email, name, timestamp, company_id } = data.payload;

    const auditEvent = {
      topic : "link.event.user.signin.audit",
      payload : { user_id, email, name , timestamp, company_id },
      action : "signIn",
      message : `${name}님이 로그인 하셨습니다.`
    }
    console.log(auditEvent);
    await publishEvent(auditEvent.topic, auditEvent);
    
    Logger.info('사용자 로그인 로그 저장 성공', {  data });
  } catch(err) {
    Logger.error('사용자 로그인 로그 저장 실패', { err,  data });
  }
}