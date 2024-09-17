import type { DiaristChangeAcceptingServicesData } from '@marinetesio/types/dtos/diarist/api';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

export class DiaristChangeAcceptingServicesService implements Service {
  async execute(
    diaristId: string,
    data: DiaristChangeAcceptingServicesData,
  ): Promise<void> {
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    await DiaristRepository.update(diarist.id, {
      accepting_services: Boolean(data.accepting_services),
    });
  }
}
