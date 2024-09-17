import {
  DiaristRepository,
  DiaristStatusRepository,
} from '@marinetes/database';
import { ForbiddenError, RegisterNotFoundError } from '@marinetes/errors';

export class DiaristApproveService implements Service {
  async execute(diaristId: string): Promise<void> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .innerJoinAndSelect('diarist.status', 'status')
      .select(['diarist.id', 'status.id', 'status.approved'])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    const { status } = diarist;

    if (status.approved) {
      throw new ForbiddenError();
    }

    // enviar email para primeira alteração de senha

    await DiaristStatusRepository.update(status.id, {
      type: 'active',
      approved: true,
    });
  }
}
