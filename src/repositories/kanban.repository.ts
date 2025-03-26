//redis 업데이트
import { redis } from "../config/redis";


export const updateKanbanBoardUserOnline = async (user_id: number, board_id: number, online: boolean) => {
  const key = `board:${board_id}:online_users`;
  if (online) {
    await redis.sadd(key, user_id.toString());
  } else {
    await redis.srem(key, user_id.toString());
  }
};


