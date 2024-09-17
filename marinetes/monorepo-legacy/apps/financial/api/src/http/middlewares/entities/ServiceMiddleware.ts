import { ServiceRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { Request, Response, NextFunction } from 'express';

import { MiddlewareBase, buildMiddleware } from '@bases/MiddlewareBase';

class Middleware extends MiddlewareBase {
  async execute(
    { manager, params: { serviceId } }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const service = await ServiceRepository.findOne(serviceId, {
      select: ['id'],
    });

    if (!service) {
      throw new RegisterNotFoundError();
    }

    manager.setService(service);
    next();
  }
}

export const ServiceMiddleware = buildMiddleware(Middleware);
