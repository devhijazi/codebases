import type { DiaristDocument } from '@marinetesio/types/dtos/diarist/api';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

export class DiaristGetService implements Service {
  async execute(diaristId: string): Promise<DiaristDocument> {
    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
      relations: ['status'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    return diarist;
  }
}
