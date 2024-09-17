import { UserRepository } from '@marinetes/database';
import { AuthenticationError } from '@marinetes/errors';
import { Request, Response, NextFunction } from 'express';

import { MiddlewareBase, buildMiddleware } from '@bases/MiddlewareBase';
import { SessionTokenHelper } from '@infra/helpers/token/SessionTokenHelper';

class Middleware extends MiddlewareBase {
  async execute(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const authorization = req.header('authorization');

    if (!authorization) {
      throw new AuthenticationError();
    }

    const [type, token] = authorization.split(/[ \t]+/);

    if (type.toLowerCase() !== 'bearer') {
      throw new AuthenticationError();
    }

    if (!token) {
      throw new AuthenticationError();
    }

    const tokenIsValid = SessionTokenHelper.verify(token);

    if (!tokenIsValid) {
      throw new AuthenticationError();
    }

    const { sub: userId } = SessionTokenHelper.decode(token);
    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new AuthenticationError();
    }

    req.manager.setAuthenticated(user);
    next();
  }
}

export const AuthenticationMiddleware = buildMiddleware(Middleware);
