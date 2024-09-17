import { DiaristRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { Request, Response, NextFunction } from 'express';

import { MiddlewareBase, buildMiddleware } from '@bases/MiddlewareBase';

class Middleware extends MiddlewareBase {
  async execute(
    { manager, params: { diaristId } }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    manager.setDiarist(diarist);
    next();
  }
}

export const DiaristMiddleware = buildMiddleware(Middleware);
