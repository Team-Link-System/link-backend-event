import { Logger } from "../../../utils/logger";
import * as auditRepository from "../../../repositories/audit.repository";
import * as userType from "../types/user.type";

export const handleUserSignIn = async (data: userType.UserSignInAudit) => {
  try {
    await  auditRepository.saveUserSignInAudit(data);
    Logger.info('사용자 로그인 로그 저장 성공', {  data });
  } catch(err) {
    Logger.error('사용자 로그인 로그 저장 실패', { err,  data });
  }
}