import { DiaristRepository, ValidationRepository } from '@marinetes/database';
import { diaristFirstPasswordSetValidationConfig } from '@marinetes/diarist-validation-config';
import { BadRequestError, RegisterNotFoundError } from '@marinetes/errors';
import type { DiaristFirstPasswordSetData } from '@marinetes/types/dtos/diarist/api';
import { validationIsExpired } from '@marinetes/validation-is-expired';

export class DiaristFirstPasswordSetService implements Service {
  async execute(data: DiaristFirstPasswordSetData): Promise<void> {
    const { token, password } = data;

    const validation = await ValidationRepository.findOne({
      where: {
        type: diaristFirstPasswordSetValidationConfig.type,
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
        diaristFirstPasswordSetValidationConfig.minutesToExpires,
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
