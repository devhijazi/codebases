import { DiaristRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type {
  ServiceDocument,
  DiaristAcceptedServicesListDocument,
} from '@marinetes/types/dtos/diarist/api';
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
