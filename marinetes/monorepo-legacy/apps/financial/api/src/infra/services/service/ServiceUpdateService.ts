import { ServiceRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { ServiceUpdateData } from '@marinetes/types/dtos/financial/api';

export class ServiceUpdateService implements Service {
  async execute(serviceId: string, data: ServiceUpdateData): Promise<void> {
    const service = await ServiceRepository.findOne(serviceId, {
      select: ['id'],
    });

    if (!service) {
      throw new RegisterNotFoundError();
    }

    await ServiceRepository.update(service.id, data);
  }
}
