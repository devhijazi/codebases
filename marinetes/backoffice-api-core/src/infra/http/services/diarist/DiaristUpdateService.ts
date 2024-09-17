import type { DiaristUpdateData } from '@marinetesio/types/dtos/financial/api';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

export class DiaristUpdateService implements Service {
  async execute(diaristId: string, data: DiaristUpdateData): Promise<void> {
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    await DiaristRepository.update(diarist.id, data);
  }
}
