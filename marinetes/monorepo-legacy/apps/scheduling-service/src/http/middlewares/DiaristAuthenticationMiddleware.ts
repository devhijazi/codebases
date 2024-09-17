import { DiaristRepository } from '@marinetes/database';
import { AuthenticationError } from '@marinetes/errors';
import { Request, Response, NextFunction } from 'express';

import { DiaristSessionTokenHelper } from '@/infra/helpers/token/DiaristSessionTokenHelper';
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

    const tokenIsValid = DiaristSessionTokenHelper.verify(token);

    if (!tokenIsValid) {
      throw new AuthenticationError();
    }

    const { sub: diaristId } = DiaristSessionTokenHelper.decode(token);
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id'],
    });

    if (!diarist) {
      throw new AuthenticationError();
    }

    req.manager.setAuthenticatedDiarist({
      id: diarist.id,
    });
    next();
  }
}

export const DiaristAuthenticationMiddleware = buildMiddleware(Middleware);
