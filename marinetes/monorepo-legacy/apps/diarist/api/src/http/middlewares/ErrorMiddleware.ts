import { ErrorBase, APIError } from '@marinetes/errors';
import { Request, Response, NextFunction } from 'express';

import { MiddlewareBase, buildMiddleware } from '@bases/MiddlewareBase';

class Middleware extends MiddlewareBase {
  execute(error: any, _req: Request, res: Response, _next: NextFunction): void {
    if (error instanceof ErrorBase) {
      res.status(error.status).json(error.toObject());
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.error((error && error.stack) || error);
    }

    const apiError = new APIError();

    res.status(apiError.status).json(apiError.toObject());
  }
}

export const ErrorMiddleware = buildMiddleware(Middleware);

/* eslint no-console: off */
