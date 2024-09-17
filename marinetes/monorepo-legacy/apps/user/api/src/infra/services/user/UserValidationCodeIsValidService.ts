import { ValidationRepository } from '@marinetes/database';
import type {
  UserValidationCodeIsValidData,
  UserCreateValidationResultDocument,
} from '@marinetes/types/dtos/user/api';

import { userValidationConfig } from '@/config/user-validation';

import { userCreateValidationIsExpired } from '../common/userCreateValidationIsExpired';

export class UserValidationCodeIsValidService implements Service {
  async execute(
    data: UserValidationCodeIsValidData,
  ): Promise<UserCreateValidationResultDocument> {
    const { code, email } = data;

    const validation = await ValidationRepository.findOne({
      where: {
        type: userValidationConfig.type,
        subject: email,
        validation: code,
      },
    });

    if (!validation) {
      return {
        valid: false,
      };
    }

    return {
      valid: !userCreateValidationIsExpired(validation),
    };
  }
}
