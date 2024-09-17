import type {
  ServiceDocument,
  DiaristAcceptedServicesListDocument,
} from '@marinetesio/types/dtos/diarist/api';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { instanceToPlain } from 'class-transformer';

export class DiaristAcceptedServicesListService implements Service {
  async execute(
    diaristId: string,
  ): Promise<DiaristAcceptedServicesListDocument> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .leftJoinAndSelect('diarist.accepted_services', 'accepted_services')
      .select([
        'diarist.id',
        'accepted_services.id',
        'accepted_services.title',
        'accepted_services.icon',
      ])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    return {
      accepted_services: instanceToPlain(
        diarist.accepted_services,
      ) as ServiceDocument[],
    };
  }
}
