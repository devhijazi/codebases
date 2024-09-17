import { AuthenticationError } from '@marinetes/errors';
import { Request, Response, NextFunction } from 'express';

import { buildMiddleware, MiddlewareBase } from '@bases/MiddlewareBase';

class Middleware extends MiddlewareBase {
  async execute(req: Request, _: Response, next: NextFunction): Promise<void> {
    const isAdmin = req.manager.authenticated.admin;

    if (!isAdmin) {
      throw new AuthenticationError();
    }

    next();
  }
}

export const PermissionMiddleware = buildMiddleware(Middleware);
