import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';

import type { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Logger } from '../../utils';

export interface ITransformOptions {
  skipPaths?: string[];
  code?: number;
  message?: string;
}

export const GetTransformInterceptor = (
  options: ITransformOptions = {},
): Type<NestInterceptor> => {
  @Injectable()
  class TransformInterceptor implements NestInterceptor {
    private options: ITransformOptions;
    constructor() {
      this.options = options;
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req: Request = context.getArgByIndex(1).req;
      const reqPath = req?.originalUrl?.split('?')[0];
      if (this.options?.skipPaths?.includes(reqPath)) {
        return next.handle();
      }

      return next.handle().pipe(
        map((data) => {
          const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      Request original url: ${req.originalUrl}
      Method: ${req.method}
      IP: ${req.ip}
      User: ${JSON.stringify(req.user)}
      Response data:\n ${JSON.stringify(data)}
      <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
          Logger.info(logFormat);
          Logger.access(logFormat);

          return {
            data,
            error: this.options?.code ?? 0,
            error_msg: this.options?.message ?? undefined,
          };
        }),
      );
    }
  }

  return TransformInterceptor;
};

export const TransformInterceptor = GetTransformInterceptor({
  skipPaths: [],
});
