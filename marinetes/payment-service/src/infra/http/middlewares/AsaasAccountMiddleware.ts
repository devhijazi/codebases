import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { Request, Response, NextFunction } from 'express';

import { Middleware, buildMiddleware } from '@/core/infra/http/Middleware';
import { RequestManager } from '@/core/infra/http/RequestManager';

class AsaasAccountMiddlewareStructure extends Middleware {
  async execute(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const {
      params: { accountId },
    } = request;
    request.manager = new RequestManager();

    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({
        asaas_integration: {
          id: accountId,
        },
      })
      .innerJoinAndSelect('diarist.status', 'status')
      .leftJoinAndSelect('diarist.asaas_integration', 'asaas_integration')
      .select([
        'diarist.id',
        'diarist.full_name',
        'diarist.birthdate',
        'diarist.document',
        'diarist.phone',
        'diarist.email',
        'status.id',
        'status.type',
        'asaas_integration.id',
        'asaas_integration.account_id',
      ])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    request.manager.setDiarist(diarist);

    next();
  }
}

export const AsaasAccountMiddleware = buildMiddleware(
  AsaasAccountMiddlewareStructure,
);
