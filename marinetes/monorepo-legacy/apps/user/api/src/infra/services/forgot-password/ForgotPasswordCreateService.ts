import { randomBytes } from 'crypto';

import { UserRepository, ValidationRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { ForgotPasswordCreateData } from '@marinetes/types/dtos/user/api';
import Str from '@supercharge/strings';

import { userForgotPasswordValidationConfig } from '@/config/user-validation';
import { producer } from '@/infra/kafka/client';

const generateToken = (): string =>
  randomBytes(userForgotPasswordValidationConfig.tokenLength / 2).toString(
    'hex',
  );

export class ForgotPasswordCreateService implements Service {
  async execute({ email }: ForgotPasswordCreateData): Promise<void> {
    const user = await UserRepository.findOne({
      select: ['id', 'full_name', 'email'],
      where: {
        email,
      },
    });

    if (!user) {
      throw new RegisterNotFoundError();
    }

    await ValidationRepository.delete({
      type: userForgotPasswordValidationConfig.type,
      subject: user.id,
    });

    const token = generateToken();

    await ValidationRepository.create({
      type: userForgotPasswordValidationConfig.type,
      expiration_time_in_minutes:
        userForgotPasswordValidationConfig.minutesToExpires,
      subject: user.id,
      validation: token,
    }).save();

    const userNameArray = Str(user.full_name)
      .title()
      .trim()
      .words()
      .slice(0, 2);

    const emailData = {
      subject: 'Redefinição de Senha',
      to: `${userNameArray.join(' ')} <${email}>`,
      template: {
        name: 'forgot-password',
        group: 'user',
        context: {
          userName: userNameArray[0],
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
