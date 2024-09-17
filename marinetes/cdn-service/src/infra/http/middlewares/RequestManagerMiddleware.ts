import { Request, Response, NextFunction } from 'express';

import { Middleware, buildMiddleware } from '@/core/infra/http/Middleware';
import { RequestManager } from '@/core/infra/http/RequestManager';

class RequestManagerMiddlewareStructure extends Middleware {
  async execute(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    request.manager = new RequestManager();

    next();
  }
}

export const RequestManagerMiddleware = buildMiddleware(
  RequestManagerMiddlewareStructure,
);
