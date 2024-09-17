import { DiaristRepository } from '@marinetes/database';
import { AuthenticationError, ForbiddenError } from '@marinetes/errors';
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

    const { sub: diaristId } = SessionTokenHelper.decode(token);
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .innerJoinAndSelect('diarist.status', 'status')
      .select(['diarist.id', 'status.type'])
      .getOne();

    if (!diarist) {
      throw new AuthenticationError();
    }

    if (diarist.status.type !== 'active') {
      throw new ForbiddenError();
    }

    req.manager.setAuthenticated({
      id: diarist.id,
    });

    next();
  }
}

export const AuthenticationMiddleware = buildMiddleware(Middleware);
