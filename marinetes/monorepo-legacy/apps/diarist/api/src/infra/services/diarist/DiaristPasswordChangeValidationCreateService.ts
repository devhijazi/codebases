import { ValidationRepository, DiaristRepository } from '@marinetes/database';
import { diaristPasswordChangeValidationConfig } from '@marinetes/diarist-validation-config';
import { RegisterNotFoundError } from '@marinetes/errors';
import Str from '@supercharge/strings';
import { customAlphabet } from 'nanoid';

import { producer } from '@/infra/kafka/client';

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
      topic: process.env.KAFKA_TOPIC_ISSUE_EMAIL,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
