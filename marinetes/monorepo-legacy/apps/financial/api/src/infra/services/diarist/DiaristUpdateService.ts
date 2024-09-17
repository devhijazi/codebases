import { DiaristRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { DiaristUpdateData } from '@marinetes/types/dtos/financial/api';

export class DiaristUpdateService implements Service {
  async execute(diaristId: string, data: DiaristUpdateData): Promise<void> {
    const diarist = await DiaristRepository.findOne(diaristId, {
      select: ['id'],
    });

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    await DiaristRepository.update(diarist.id, data);
  }
}
