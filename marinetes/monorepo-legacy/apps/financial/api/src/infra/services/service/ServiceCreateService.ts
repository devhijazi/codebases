import { ServiceRepository } from '@marinetes/database';
import { RegisterFoundError } from '@marinetes/errors';
import {
  ServiceCreateData,
  ServiceDocument,
} from '@marinetes/types/dtos/financial/api';

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
