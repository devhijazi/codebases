import { DiaristRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { DiaristChangeAcceptingServicesData } from '@marinetes/types/dtos/diarist/api';

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
