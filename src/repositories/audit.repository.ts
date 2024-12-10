import { Audit } from "../models/audit.model";

export const saveUserSignInAudit = async (data: any) => {
  const auditData = {
    topic : data.topic,
    action : "signIn",
    payload : data.payload,
  }
  await Audit.create(auditData);
}
