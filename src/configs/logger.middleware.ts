import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime();

    res.on('finish', () => {
      const [seconds, nanoseconds] = process.hrtime(start);
      const latency = seconds * 1e3 + nanoseconds * 1e-6;

      logger.info({
        time: new Date().toISOString(),
        remote_ip: req.ip,
        host: req.headers.host,
        method: req.method,
        uri: req.originalUrl,
        status: res.statusCode,
        error: res.statusCode >= 400 ? 'Error' : '',
        latency: `${latency.toFixed(3)}ms`,
        bytes_in: req.headers['content-length'] || 0,
        bytes_out: res.get('Content-Length') || 0,
      });
    });
    next();
  }
}
