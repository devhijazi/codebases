import type { ServiceUpdateData } from '@marinetesio/types/dtos/financial/api';

import { ServiceRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

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
