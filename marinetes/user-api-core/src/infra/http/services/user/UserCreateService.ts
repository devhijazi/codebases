import type { UserCreateData } from '@marinetesio/types/dtos/user/api';

import {
  UserRepository,
  ValidationRepository,
} from '@marinetesio/database/typeorm/mysql';
import { BadRequestError, RegisterFoundError } from '@marinetesio/errors';

import { userValidationConfig } from '@/config/user-validation';

import { userCreateValidationIsExpired } from '../common/userCreateValidationIsExpired';

export class UserCreateService implements Service {
  async execute(data: UserCreateData): Promise<void> {
    const { code, data: userData } = data;

    const hasUserWithInsertedEmailOrDocument =
      await UserRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.addresses', 'address')
        .where({ email: userData.email })
        .orWhere({ document: userData.document })
        .select(['user.id', 'user.email', 'user.document'])
        .getOne();

    if (hasUserWithInsertedEmailOrDocument) {
      throw new RegisterFoundError();
    }

    const validation = await ValidationRepository.findOne({
      where: {
        type: userValidationConfig.type,
        subject: userData.email,
        validation: code,
      },
    });

    if (!validation || userCreateValidationIsExpired(validation)) {
      throw new BadRequestError();
    }

    await UserRepository.create(userData).save();
  }
}
