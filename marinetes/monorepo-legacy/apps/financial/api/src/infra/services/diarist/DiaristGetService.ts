import { DiaristRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { DiaristDocument } from '@marinetes/types/dtos/financial/api';
import { instanceToPlain } from 'class-transformer';

export class DiaristGetService implements Service {
  async execute(diaristId: string): Promise<DiaristDocument> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .innerJoinAndSelect('diarist.status', 'status')
      .leftJoinAndSelect('diarist.address', 'address')
      .leftJoinAndSelect('diarist.bank_data', 'bank_data')
      .select([
        'diarist.id',
        'diarist.full_name',
        'diarist.avatar',
        'diarist.birthdate',
        'diarist.document',
        'diarist.general_register',
        'diarist.phone',
        'diarist.email',
        'bank_data.bank_number',
        'bank_data.bank_name',
        'bank_data.agency',
        'bank_data.account',
        'address.zip_code',
        'address.state',
        'address.city',
        'address.neighborhood',
        'address.street',
        'address.number',
        'status.type',
        'status.approved',
        'status.last_attend_email_sent_date',
        'status.disable_date',
        'status.disable_reason',
      ])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    return instanceToPlain(diarist) as DiaristDocument;
  }
}
