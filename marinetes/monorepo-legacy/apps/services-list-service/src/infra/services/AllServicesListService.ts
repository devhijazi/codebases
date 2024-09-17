import { ServiceRepository } from '@marinetes/database';
import type {
  AllServicesDocument,
  ServiceDocument,
} from '@marinetes/types/dtos/services-list-service';
import { instanceToPlain } from 'class-transformer';

export class AllServicesListService implements Service {
  async execute(): Promise<AllServicesDocument> {
    const services = await ServiceRepository.createQueryBuilder('service')
      .select(['service.id', 'service.title', 'service.icon'])
      .getMany();

    return instanceToPlain(services) as ServiceDocument[];
  }
}
