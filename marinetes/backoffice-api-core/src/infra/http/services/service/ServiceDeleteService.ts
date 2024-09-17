import { ServiceRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

export class ServiceDeleteService implements Service {
  async execute(serviceId: string): Promise<void> {
    const service = await ServiceRepository.findOne(serviceId, {
      select: ['id'],
    });

    if (!service) {
      throw new RegisterNotFoundError();
    }

    await ServiceRepository.delete(service.id);
  }
}
