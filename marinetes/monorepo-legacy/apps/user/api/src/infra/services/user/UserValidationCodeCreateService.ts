import { ValidationRepository, UserRepository } from '@marinetes/database';
import { RegisterFoundError } from '@marinetes/errors';
import type { UserValidationCodeCreateData } from '@marinetes/types/dtos/user/api';
import { customAlphabet } from 'nanoid';

import { userValidationConfig } from '@/config/user-validation';
import { producer } from '@/infra/kafka/client';

const NUMBER_VALUES = '1234567890';

const generateCode = customAlphabet(
  NUMBER_VALUES,
  userValidationConfig.codeSize,
);

export class UserValidationCodeCreateService implements Service {
  async execute(data: UserValidationCodeCreateData): Promise<void> {
    const { email } = data;

    const hasUserWithEmail = await UserRepository.findOne({
      select: ['id', 'email'],
      where: {
        email,
      },
    });

    if (hasUserWithEmail) {
      throw new RegisterFoundError();
    }

    await ValidationRepository.delete({
      type: userValidationConfig.type,
      subject: email,
    });

    const code = generateCode();

    await ValidationRepository.create({
      type: userValidationConfig.type,
      expiration_time_in_minutes: userValidationConfig.minutesToExpires,
      subject: email,
      validation: code,
    }).save();

    const emailData = {
      subject: 'Código de verificação',
      to: `<${email}>`,
      template: {
        name: 'user-code',
        group: 'user',
        context: {
          code,
        },
      },
    };

    await producer.send({
      topic: process.env.KAFKA_TOPIC_ISSUE_EMAIL,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
