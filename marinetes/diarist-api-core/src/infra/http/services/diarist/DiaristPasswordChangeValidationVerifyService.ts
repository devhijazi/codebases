import type {
  DiaristPasswordChangeValidationVerifyData,
  DiaristPasswordChangeValidationVerifyDocument,
} from '@marinetesio/types/dtos/diarist/api';

import {
  DiaristRepository,
  ValidationRepository,
} from '@marinetesio/database/typeorm/mysql';
import { diaristPasswordChangeValidationConfig } from '@marinetesio/diarist-validation-config';
import { BadRequestError, RegisterNotFoundError } from '@marinetesio/errors';

import { diaristPasswordChangeValidationIsExpired } from './common/diaristPasswordChangeValidationIsExpired';

export class DiaristPasswordChangeValidationVerifyService implements Service {
  async execute(
    diaristId: string,
    data: DiaristPasswordChangeValidationVerifyData,
  ): Promise<DiaristPasswordChangeValidationVerifyDocument> {
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    const { code } = data;

    const validation = await ValidationRepository.findOne({
      where: {
        type: diaristPasswordChangeValidationConfig.type,
        subject: diarist.id,
      },
    });

    if (!validation) {
      throw new BadRequestError();
    }

    const codeMatch = validation.validation === code;
    const valid =
      codeMatch && !diaristPasswordChangeValidationIsExpired(validation);

    return {
      valid,
    };
  }
}
