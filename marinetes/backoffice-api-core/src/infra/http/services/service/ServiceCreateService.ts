import type {
  ServiceCreateData,
  ServiceDocument,
} from '@marinetesio/types/dtos/financial/api';

import { ServiceRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterFoundError } from '@marinetesio/errors';

export class ServiceCreateService implements Service {
  async execute(data: ServiceCreateData): Promise<ServiceDocument> {
    const { title } = data;
    const hasService = await ServiceRepository.createQueryBuilder('service')
      .orWhere({ title })
      .select(['service.title', 'service.icon'])
      .getOne();

    if (hasService) {
      throw new RegisterFoundError();
    }

    const service = await ServiceRepository.create({
      ...data,
    }).save();

    return service;
  }
}
