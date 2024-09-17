import type {
  AllServicesDocument,
  ServiceDocument,
} from '@marinetesio/types/dtos/services-list-service';

import { ServiceRepository } from '@marinetesio/database/typeorm/mysql';
import { instanceToPlain } from 'class-transformer';

export class AllServicesListService implements Service {
  async execute(): Promise<AllServicesDocument> {
    const services = await ServiceRepository.createQueryBuilder('service')
      .select(['service.id', 'service.title', 'service.icon'])
      .getMany();

    return instanceToPlain(services) as ServiceDocument[];
  }
}
