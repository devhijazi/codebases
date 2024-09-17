import { UserRepository, ValidationRepository } from '@marinetes/database';
import { BadRequestError, RegisterNotFoundError } from '@marinetes/errors';
import type { ForgotPasswordResetData } from '@marinetes/types/dtos/user/api';
import { validationIsExpired } from '@marinetes/validation-is-expired';

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
