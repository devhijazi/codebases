import type { DiaristDocument } from '@marinetesio/types/dtos/financial/api';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { instanceToPlain } from 'class-transformer';

// import { diaristPaymentServiceClient } from '@/infra/grpc';

export class DiaristGetService implements Service {
  async execute(diaristId: string): Promise<DiaristDocument> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .innerJoinAndSelect('diarist.status', 'status')
      .leftJoinAndSelect('diarist.address', 'address')
      .select([
        'diarist.id',
        'diarist.full_name',
        'diarist.avatar',
        'diarist.birthdate',
        'diarist.document',
        'diarist.general_register',
        'diarist.phone',
        'diarist.email',
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

    // const diaristPaymentAccountInformationCall =
    //   await diaristPaymentServiceClient.getInformation({
    //     diaristId,
    //   });

    // const diaristPaymentAccountInformation =
    //   diaristPaymentAccountInformationCall.response;

    return {
      ...(instanceToPlain(diarist) as DiaristDocument),
      // paymentAccountInformation: diaristPaymentAccountInformation,
    } as any;
  }
}
