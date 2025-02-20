import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
dotenv.config({ path: path.join(__dirname, `../${envFile}`) });

import { initConfig, shutdown } from './config';
import { startApp } from './app';
import { Logger } from './utils/logger';
import { startSubscription } from './config/nats';



const startServer = async () => {
  try {
    
    await initConfig();
    await startApp();
    await startSubscription();

    // Graceful shutdown 처리
    process.on('SIGTERM', async () => {
      Logger.info('SIGTERM signal received.');
      await shutdown();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      Logger.info('SIGINT signal received.');
      await shutdown();
      process.exit(0);
    });

  } catch (error) {
    Logger.error('Server startup failed:', error);
    await shutdown();
    process.exit(1);
  }
};

startServer();
