import type { UserValidationCodeCreateData } from '@marinetesio/types/dtos/user/api';

import {
  ValidationRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import { RegisterFoundError } from '@marinetesio/errors';
import { customAlphabet } from 'nanoid';

import { userValidationConfig } from '@/config/user-validation';
import { producer, topics } from '@/infra/kafka';

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
      topic: topics.marinetesMailerIssueEmail,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
