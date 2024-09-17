import { UserRepository } from '@marinetes/database';
import { AuthenticationError } from '@marinetes/errors';
import { Request, Response, NextFunction } from 'express';

import { UserSessionTokenHelper } from '@/infra/helpers/token/UserSessionTokenHelper';
import { MiddlewareBase, buildMiddleware } from '@bases/MiddlewareBase';

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

    const tokenIsValid = UserSessionTokenHelper.verify(token);

    if (!tokenIsValid) {
      throw new AuthenticationError();
    }

    const { sub: userId } = UserSessionTokenHelper.decode(token);
    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new AuthenticationError();
    }

    req.manager.setAuthenticatedUser({
      id: user.id,
    });
    next();
  }
}

export const UserAuthenticationMiddleware = buildMiddleware(Middleware);
