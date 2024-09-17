import {
  ValidationRepository,
  DiaristRepository,
} from '@marinetesio/database/typeorm/mysql';
import { diaristPasswordChangeValidationConfig } from '@marinetesio/diarist-validation-config';
import { RegisterNotFoundError } from '@marinetesio/errors';
import Str from '@supercharge/strings';
import { customAlphabet } from 'nanoid';

import { producer, topics } from '@/infra/kafka';

const NUMBER_VALUES = '1234567890';

const generateCode = customAlphabet(
  NUMBER_VALUES,
  diaristPasswordChangeValidationConfig.codeSize,
);

export class DiaristPasswordChangeValidationCreateService implements Service {
  async execute(diaristId: string): Promise<void> {
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id', 'full_name', 'email'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    await ValidationRepository.delete({
      type: diaristPasswordChangeValidationConfig.type,
      subject: diarist.id,
    });

    const code = generateCode();

    await ValidationRepository.create({
      type: diaristPasswordChangeValidationConfig.type,
      expiration_time_in_minutes:
        diaristPasswordChangeValidationConfig.minutesToExpires,
      subject: diarist.id,
      validation: code,
    }).save();

    const diaristName = Str(diarist.full_name)
      .title()
      .trim()
      .words()
      .slice(0, 2)
      .join(' ');

    const emailData = {
      subject: 'Alteração de Senha',
      to: `${diaristName} <${diarist.email}>`,
      template: {
        name: 'password-change',
        group: 'diarist',
        context: {
          code,
          userName: diaristName,
        },
      },
    };

    await producer.send({
      topic: topics.marinetesMailerIssueEmail,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
