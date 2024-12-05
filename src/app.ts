import { getNatsConnection } from './config/nats';
import { Logger } from './utils/logger';
export const startApp = async () => {
  const nc = getNatsConnection();
  // await subscribeToEvents(nc);
  Logger.info('Event subscriber started and listening for messages...');
};


