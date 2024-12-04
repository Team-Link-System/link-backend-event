import { connect, NatsConnection} from "nats";

export const connectNats = async() : Promise<NatsConnection> => {
  try {
    const nc = await connect({servers : process.env.NATS_URI as string});
    console.log("NATS 연결 성공");
    return nc;
  } catch(err){
    console.error("NATS 연결 실패:",err);
    process.exit(1);
  }
}