export interface UserLoginEvent {
  topic: string;
  payload: {
    userId : number;
  }
}