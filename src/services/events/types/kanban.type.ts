export interface Event {
  topic: string;
  eventId?: string;
  payload: any;
}

export interface KanbanBoardUpdate extends Event {
  topic: string;
  payload: {
    user_id: number;
    user_name: string;
    project_id: number;
    board_id: number;
    target_type: string;
    target_id: string;
    target_name: string;
    action: string;
    timestamp: string;
  }
}

export interface KanbanBoardUserJoin extends Event {
  topic: string;
  payload: {
    user_id: number;
    board_id: number;
    timestamp: string;
  }
}

export interface KanbanBoardUserLeave extends Event {
  topic: string;
  payload: {
    user_id: number;
    board_id: number;
    timestamp: string;
  }
}