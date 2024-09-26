import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      const logMessage = {
        time: timestamp,
        level,
        message,
        ...meta,
      };
      return JSON.stringify(logMessage);
    })
  ),
  transports: [
    new transports.Console(),
  ],
});

export default logger;
