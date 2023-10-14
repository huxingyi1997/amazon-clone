import { HttpStatus, Injectable, NestMiddleware, Type } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { Logger, isPathMatch } from '../../utils';
import { helloPath } from '../../constants';

export interface ILoggerOptions {
  skipPaths?: string[];
  skipHeadersPaths?: string[];
  skipBodyPaths?: string[];
}

export const GetLoggerMiddleware = (
  options: ILoggerOptions = {},
): Type<NestMiddleware> => {
  @Injectable()
  class LoggerMiddleware implements NestMiddleware {
    private options: ILoggerOptions;
    constructor() {
      this.options = options;
    }

    async use(req: Request, res: Response, next: NextFunction) {
      const { originalUrl: uri, method, ip } = req;
      const logPath = uri?.split('?')[0];
      // handle skipPaths
      if (isPathMatch(this.options?.skipPaths, logPath)) {
        return next();
      }

      const startTime = Date.now();
      next();

      const { statusCode: code } = res; // 响应状态码
      const endTime = Date.now();
      const body = isPathMatch(this.options?.skipBodyPaths, logPath)
        ? ''
        : JSON.stringify(req.body);

      // 组装日志信息
      const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      Request original url: ${uri}
      Method: ${method}
      IP: ${ip}
      Status code: ${code}
      Cost: ${endTime - startTime}ms,
      Parmas: ${JSON.stringify(req.params)}
      Query: ${JSON.stringify(req.query)}
      Body: ${body} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    `;

      // 根据状态码，进行日志类型区分
      if (code >= HttpStatus.INTERNAL_SERVER_ERROR) {
        Logger.error(logFormat);
      } else if (code >= HttpStatus.BAD_REQUEST) {
        Logger.warn(logFormat);
      } else {
        Logger.access(logFormat);
        Logger.log(logFormat);
      }
    }
  }

  return LoggerMiddleware;
};

export const LoggerMiddleware = GetLoggerMiddleware({
  skipPaths: [helloPath],
});
