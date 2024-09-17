import type { DiaristDocument } from '@marinetesio/types/dtos/user/api';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { instanceToPlain } from 'class-transformer';

export class DiaristGetService implements Service {
  async execute(diaristId: string): Promise<DiaristDocument> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .select(['diarist.id', 'diarist.avatar', 'diarist.full_name'])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    return instanceToPlain(diarist) as DiaristDocument;
  }
}
