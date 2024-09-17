import { DiaristRepository, ValidationRepository } from '@marinetes/database';
import { diaristPasswordChangeValidationConfig } from '@marinetes/diarist-validation-config';
import { BadRequestError, RegisterNotFoundError } from '@marinetes/errors';
import type {
  DiaristPasswordChangeValidationVerifyData,
  DiaristPasswordChangeValidationVerifyDocument,
} from '@marinetes/types/dtos/diarist/api';

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
