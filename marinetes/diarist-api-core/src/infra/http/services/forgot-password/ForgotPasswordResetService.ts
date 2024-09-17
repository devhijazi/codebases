import type { ForgotPasswordResetData } from '@marinetesio/types/dtos/diarist/api';

import {
  DiaristRepository,
  ValidationRepository,
} from '@marinetesio/database/typeorm/mysql';
import { diaristForgotPasswordValidationConfig } from '@marinetesio/diarist-validation-config';
import { BadRequestError, RegisterNotFoundError } from '@marinetesio/errors';
import { validationIsExpired } from '@marinetesio/validation-is-expired';

export class ForgotPasswordResetService implements Service {
  public async execute(data: ForgotPasswordResetData): Promise<void> {
    const { token, password } = data;

    const validation = await ValidationRepository.findOne({
      where: {
        type: diaristForgotPasswordValidationConfig.type,
        validation: token,
      },
    });

    if (!validation) {
      throw new BadRequestError();
    }

    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: validation.subject })
      .select(['diarist.id', 'diarist.password'])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    const deleteValidation = (): Promise<any> =>
      ValidationRepository.delete(validation.id);

    if (
      validationIsExpired(
        validation,
        diaristForgotPasswordValidationConfig.minutesToExpires,
      )
    ) {
      await deleteValidation();

      throw new BadRequestError();
    }

    diarist.password = password;

    await diarist.save();

    await deleteValidation();
  }
}
