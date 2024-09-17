import type { Service as ServiceModel } from '@marinetesio/types/model';

import { ServiceRepository } from '@marinetesio/database/typeorm/mysql';

export class ServicesListService implements Service {
  async execute(): Promise<ServiceModel[]> {
    const services = await ServiceRepository.createQueryBuilder('service')
      .select(['service.id', 'service.title', 'service.icon'])
      .getMany();

    return services;
  }
}
