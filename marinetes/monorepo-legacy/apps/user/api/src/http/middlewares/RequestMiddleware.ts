import { Request, Response, NextFunction } from 'express';

import { MiddlewareBase, buildMiddleware } from '@bases/MiddlewareBase';
import { RequestManager } from '@core/managers/RequestManager';

class Middleware extends MiddlewareBase {
  execute(req: Request, _res: Response, next: NextFunction): void {
    req.manager = new RequestManager();

    next();
  }
}

export const RequestMiddleware = buildMiddleware(Middleware);
