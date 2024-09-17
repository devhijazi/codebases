import { APIError, ErrorBase } from '@marinetesio/errors';
import { Request, Response, NextFunction } from 'express';

import { Middleware, buildMiddleware } from '@/core/infra/http/Middleware';

class ErrorMiddlewareStructure extends Middleware {
  async execute(
    error: any,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ): Promise<void> {
    if (error instanceof ErrorBase) {
      response.status(error.status).json(error.toObject());

      return;
    }

    if (process.env.NODE_ENV === 'development') {
      console.error((error && error.stack) || error);
    }

    const apiError = new APIError();

    response.status(apiError.status).json(apiError.toObject());
  }
}

export const ErrorMiddleware = buildMiddleware(ErrorMiddlewareStructure);
