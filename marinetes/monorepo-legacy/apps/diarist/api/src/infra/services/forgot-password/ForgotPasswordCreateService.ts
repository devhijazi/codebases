import { randomBytes } from 'crypto';

import { DiaristRepository, ValidationRepository } from '@marinetes/database';
import { diaristForgotPasswordValidationConfig } from '@marinetes/diarist-validation-config';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { ForgotPasswordCreateData } from '@marinetes/types/dtos/diarist/api';
import Str from '@supercharge/strings';

import { producer } from '@/infra/kafka/client';

const generateToken = (): string =>
  randomBytes(diaristForgotPasswordValidationConfig.tokenLength / 2).toString(
    'hex',
  );

export class ForgotPasswordCreateService implements Service {
  async execute({ email }: ForgotPasswordCreateData): Promise<void> {
    const diarist = await DiaristRepository.findOne({
      select: ['id', 'full_name', 'email'],
      where: { email },
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    await ValidationRepository.delete({
      type: diaristForgotPasswordValidationConfig.type,
      subject: diarist.id,
    });

    const token = generateToken();

    await ValidationRepository.create({
      type: diaristForgotPasswordValidationConfig.type,
      expiration_time_in_minutes:
        diaristForgotPasswordValidationConfig.minutesToExpires,
      subject: diarist.id,
      validation: token,
    }).save();

    const diaristNameArray = Str(diarist.full_name)
      .title()
      .trim()
      .words()
      .slice(0, 2);

    const emailData = {
      subject: 'Redefinição de Senha',
      to: `${diaristNameArray.join(' ')} <${email}>`,
      template: {
        name: 'forgot-password',
        group: 'diarist',
        context: {
          userName: diaristNameArray[0],
          resetUrl: `https://marinetes.com.br/user/reset-password?token=${token}`,
        },
      },
    };

    await producer.send({
      topic: process.env.KAFKA_TOPIC_ISSUE_EMAIL,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
