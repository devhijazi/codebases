import {
  DiaristAddressRepository,
  DiaristRepository,
  DiaristStatusRepository,
} from '@marinetes/database';
import { RegisterFoundError } from '@marinetes/errors';
import type {
  DiaristCreateData,
  DiaristCreateDocument,
} from '@marinetes/types/dtos/financial/api';

export class DiaristCreateService implements Service {
  async execute(data: DiaristCreateData): Promise<DiaristCreateDocument> {
    const { email, document, general_register } = data;

    const hasDiarist = await DiaristRepository.createQueryBuilder('diarist')
      .orWhere({ email })
      .orWhere({ document })
      .orWhere({ general_register })
      .select([
        'diarist.id',
        'diarist.email',
        'diarist.document',
        'diarist.general_register',
      ])
      .getOne();

    if (hasDiarist) {
      throw new RegisterFoundError();
    }

    const status = await DiaristStatusRepository.create({
      type: 'pending',
      approved: false,
    }).save();

    const address = await DiaristAddressRepository.create(data.address).save();
    const diarist = await DiaristRepository.create({
      ...data,
      address,
      password: '',
      accepting_services: false,
      status,
      accepted_services: [],
    }).save();

    return {
      id: diarist.id,
    };
  }
}
