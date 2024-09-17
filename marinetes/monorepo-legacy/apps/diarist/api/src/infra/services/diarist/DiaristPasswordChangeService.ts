import { DiaristRepository, ValidationRepository } from '@marinetes/database';
import { diaristPasswordChangeValidationConfig } from '@marinetes/diarist-validation-config';
import { BadRequestError, RegisterNotFoundError } from '@marinetes/errors';
import type { DiaristPasswordChangeData } from '@marinetes/types/dtos/diarist/api';

import { diaristPasswordChangeValidationIsExpired } from './common/diaristPasswordChangeValidationIsExpired';

export class DiaristPasswordChangeService implements Service {
  async execute(
    diaristId: string,
    data: DiaristPasswordChangeData,
  ): Promise<void> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .select(['diarist.id', 'diarist.password'])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    const { code, password } = data;

    const existsValidation = await ValidationRepository.findOne({
      where: {
        type: diaristPasswordChangeValidationConfig.type,
        subject: diarist.id,
        validation: code,
      },
    });

    if (!existsValidation) {
      throw new BadRequestError();
    }

    const deleteValidation = (): Promise<any> =>
      ValidationRepository.delete(existsValidation.id);

    if (diaristPasswordChangeValidationIsExpired(existsValidation)) {
      await deleteValidation();

      throw new BadRequestError();
    }

    diarist.password = password;

    await diarist.save();

    await deleteValidation();
  }
}
