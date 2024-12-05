import logger from './config';

export const Logger = {
  error(message: string, ...meta: any[]) {
    logger.error(message, ...meta);
  },

  warn(message: string, ...meta: any[]) {
    logger.warn(message, ...meta);
  },

  info(message: string, ...meta: any[]) {
    logger.info(message, ...meta);
  },

  debug(message: string, ...meta: any[]) {
    logger.debug(message, ...meta);
  }
};