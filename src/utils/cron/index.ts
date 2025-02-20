// 크론 작업 모음

import { scheduleViewCountSync } from "./post.cron";

export const initCron = () => {
    scheduleViewCountSync();
}

