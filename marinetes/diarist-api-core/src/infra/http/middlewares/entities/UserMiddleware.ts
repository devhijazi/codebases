import { UserRepository } from '@marinetesio/database/typeorm/mysql';
import { BadRequestError, RegisterNotFoundError } from '@marinetesio/errors';
import { Request, Response, NextFunction } from 'express';

import {
  MiddlewareBase,
  buildMiddleware,
} from '@/core/infra/http/bases/MiddlewareBase';

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
