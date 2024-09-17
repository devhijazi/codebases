import type { ForgotPasswordResetData } from '@marinetesio/types/dtos/user/api';

import {
  UserRepository,
  ValidationRepository,
} from '@marinetesio/database/typeorm/mysql';
import { BadRequestError, RegisterNotFoundError } from '@marinetesio/errors';
import { validationIsExpired } from '@marinetesio/validation-is-expired';

import { userForgotPasswordValidationConfig } from '@/config/user-validation';

export class ForgotPasswordResetService implements Service {
  public async execute(data: ForgotPasswordResetData): Promise<void> {
    const { token, password } = data;

    const validation = await ValidationRepository.findOne({
      where: {
        type: userForgotPasswordValidationConfig.type,
        validation: token,
      },
    });

    if (!validation) {
      throw new BadRequestError();
    }

    const user = await UserRepository.createQueryBuilder('user')
      .where({ id: validation.subject })
      .select(['user.id', 'user.password'])
      .getOne();

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const deleteValidation = (): Promise<any> =>
      ValidationRepository.delete(validation.id);

    if (
      validationIsExpired(
        validation,
        userForgotPasswordValidationConfig.minutesToExpires,
      )
    ) {
      await deleteValidation();

      throw new BadRequestError();
    }

    user.password = password;

    await user.save();

    await deleteValidation();
  }
}
