import { DiaristRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { DiaristDocument } from '@marinetes/types/dtos/diarist/api';
import { instanceToPlain } from 'class-transformer';

export class DiaristGetService implements Service {
  async execute(diaristId: string): Promise<DiaristDocument> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .select([
        'diarist.id',
        'diarist.full_name',
        'diarist.birthdate',
        'diarist.document',
        'diarist.general_register',
        'diarist.phone',
        'diarist.email',
        'diarist.avatar',
      ])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    return instanceToPlain(diarist) as DiaristDocument;
  }
}
