import { scheduleViewCountSync } from "./post.cron";

export const initCron = () => {
  console.log("Cron 작업 초기화 중...");
  scheduleViewCountSync();
}

