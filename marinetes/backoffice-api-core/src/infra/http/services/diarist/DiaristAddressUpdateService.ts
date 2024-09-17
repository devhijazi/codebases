import type { DiaristAddressUpdateData } from '@marinetesio/types/dtos/financial/api';

import {
  DiaristAddressRepository,
  DiaristRepository,
} from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

export class DiaristAddressUpdateService implements Service {
  async execute(
    diaristId: string,
    data: DiaristAddressUpdateData,
  ): Promise<void> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .leftJoinAndSelect('diarist.address', 'address')
      .select([
        'diarist.id',
        'address.id',
        'address.zip_code',
        'address.state',
        'address.city',
        'address.neighborhood',
        'address.street',
        'address.number',
      ])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    if (diarist.address) {
      await DiaristAddressRepository.update(diarist.address.id, data);
    } else {
      diarist.address = await DiaristAddressRepository.create(data).save();

      await diarist.save();
    }
  }
}
