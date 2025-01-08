export const TOPICS = {
  USER : {
    LOGIN : ">.user.login",
    SIGNUP : ">.user.signup",
    LOGOUT : ">.user.logout",
    ACTION : ">.user.action.>" //! 사용자가 한 액션 출근, 퇴근 , 초대 , 초대 수락, 언급 등등
  },
  CHAT : {
    MESSAGE : "chat.message",
    LEAVE : ">.chat.leave",
    JOIN : ">.chat.join"
  },
  REPORT : {
    CREATE : ">.report.create"
  }
} as const;

export type UserTopics = typeof TOPICS.USER;
export type ChatTopics = typeof TOPICS.CHAT;
export type ReportTopics = typeof TOPICS.REPORT;
export type AllTopics = UserTopics & ChatTopics & ReportTopics;