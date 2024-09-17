import type { DiaristPasswordChangeData } from '@marinetesio/types/dtos/diarist/api';

import {
  DiaristRepository,
  ValidationRepository,
} from '@marinetesio/database/typeorm/mysql';
import { diaristPasswordChangeValidationConfig } from '@marinetesio/diarist-validation-config';
import { BadRequestError, RegisterNotFoundError } from '@marinetesio/errors';

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
