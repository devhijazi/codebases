import { UserRepository } from '@marinetes/database';
import { BadRequestError, RegisterNotFoundError } from '@marinetes/errors';
import { Request, Response, NextFunction } from 'express';

import { MiddlewareBase, buildMiddleware } from '@bases/MiddlewareBase';

class Middleware extends MiddlewareBase {
  async execute(
    { manager, params: { userId } }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!userId) {
      throw new BadRequestError();
    }

    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new RegisterNotFoundError();
    }

    manager.setUser(user);
    next();
  }
}

export const UserMiddleware = buildMiddleware(Middleware);
