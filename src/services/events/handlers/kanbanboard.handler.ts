import * as auditRepository from "../../../repositories/audit.repository";
import * as kanbanType from "../types/kanban.type";
import * as kanbanRepository from "../../../repositories/kanban.repository";
export const handleKanBanBoardStateUpdate = async (
  data: kanbanType.KanbanBoardUpdate
) => {
  const {
    user_id,
    user_name,
    project_id,
    board_id,
    target_type,
    target_id,
    action,
    timestamp,
  } = data.payload;

  const auditEvent = {
    topic: data.topic,
    payload: {
      user_id,
      user_name,
      project_id,
      board_id,
      target_type,
      target_id,
      action,
      timestamp,
    },
    action: "update",
    message: `${user_name}님이 칸반보드 상태를 ${action}하셨습니다.`,
  };


  await auditRepository.saveKanBanBoardAudit(auditEvent);
};


export const handleKanBanBoardUserJoin = async (
  data: kanbanType.KanbanBoardUserJoin
) => {
  console.log("handleKanBanBoardUserJoin", data);
  const { user_id, board_id, timestamp } = data.payload;

  console.log("handleKanBanBoardUserJoin", user_id, board_id, timestamp);

  await kanbanRepository.updateKanbanBoardUserOnline(user_id, board_id, true);
};

export const handleKanBanBoardUserLeave = async (
  data: kanbanType.KanbanBoardUserLeave
) => {
  const { user_id, board_id, timestamp } = data.payload;
  
  await kanbanRepository.updateKanbanBoardUserOnline(user_id, board_id, false);
};
