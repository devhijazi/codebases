import {
  DiaristPixDataRepository,
  DiaristRepository,
  DiaristStatusRepository,
  ValidationRepository,
} from '@marinetesio/database/typeorm/mysql';
import { diaristFirstPasswordSetValidationConfig } from '@marinetesio/diarist-validation-config';
import {
  BadRequestError,
  ForbiddenError,
  RegisterNotFoundError,
} from '@marinetesio/errors';
import { DiaristPixDataKeyType } from '@marinetesio/types/model/model';
import Str from '@supercharge/strings';

import { linksConfig } from '@/config/links';
// import { diaristPaymentServiceClient } from '@/infra/grpc';
import { producer, topics } from '@/infra/kafka';

const TOKEN_SIZE = 42;

const generateToken = async (): Promise<string> => {
  const nanoid = await import('nanoid');

  return nanoid.nanoid(TOKEN_SIZE);
};

export interface DiaristApproveServiceData {
  pixKey: string;
  pixKeyType: DiaristPixDataKeyType;
}

export class DiaristApproveService implements Service {
  async execute(
    diaristId: string,
    data: DiaristApproveServiceData,
  ): Promise<void> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .innerJoinAndSelect('diarist.status', 'status')
      .leftJoinAndSelect('diarist.address', 'address')
      .select([
        'diarist.id',
        'diarist.email',
        'diarist.full_name',
        'status.id',
        'status.approved',
        'address.id',
      ])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    const { status } = diarist;

    if (status.approved) {
      throw new ForbiddenError();
    }

    if (!diarist.address) {
      throw new BadRequestError();
    }

    await DiaristPixDataRepository.create({
      key: data.pixKey,
      key_type: data.pixKeyType,
      diarist: {
        id: diarist.id,
      },
    }).save();

    await DiaristStatusRepository.update(status.id, {
      type: 'active',
      approved: true,
    });

    const diaristNameArray = Str(diarist.full_name)
      .title()
      .trim()
      .words()
      .slice(0, 2);

    const firstPasswordUrl = new URL(linksConfig.diaristSetFirstPasswordUrl);

    await ValidationRepository.delete({
      type: diaristFirstPasswordSetValidationConfig.type,
      subject: diarist.id,
    });

    const firstPassworToken = await generateToken();

    await ValidationRepository.create({
      type: diaristFirstPasswordSetValidationConfig.type,
      expiration_time_in_minutes:
        diaristFirstPasswordSetValidationConfig.minutesToExpires,
      subject: diarist.email,
      validation: firstPassworToken,
    }).save();

    firstPasswordUrl.searchParams.append('token', firstPassworToken);

    const emailData = {
      subject: 'Conta ativada com sucesso!',
      to: `${diarist.full_name} <${diarist.email}>`,
      template: {
        name: 'account-activated',
        group: 'diarist',
        context: {
          userName: diaristNameArray[0],
          firstPasswordLink: firstPasswordUrl.toString(),
        },
      },
    };

    await producer.send({
      topic: topics.marinetesMailerIssueEmail,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
