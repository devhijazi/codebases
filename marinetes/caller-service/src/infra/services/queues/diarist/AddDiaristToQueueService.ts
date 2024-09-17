import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import {
  BadRequestError,
  DiaristNotFoundError,
  ForbiddenError,
} from '@marinetesio/errors';

import { Service } from '@/core/infra/Service';
import { diaristQueue } from '@/infra/queue/queues/DiaristQueue';

export interface AddDiaristToQueueServiceRequest {
  diaristId: string;
}

export class AddDiaristToQueueService implements Service {
  async execute(request: AddDiaristToQueueServiceRequest): Promise<void> {
    const { diaristId } = request;

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
      relations: ['status'],
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    if (!diarist.accepting_services || diarist.status.type !== 'active') {
      throw new ForbiddenError();
    }

    const diaristQueueJobs = await diaristQueue.getJobs();

    const diaristHasAlreadyJoined = diaristQueueJobs.some(
      ({ data: jobData }) => jobData.diaristId === diaristId,
    );

    if (diaristHasAlreadyJoined) {
      throw new BadRequestError();
    }

    await diaristQueue.add('diarist', {
      diaristId,
      accpetedMatching: false,
      relatedUserId: null,
    });
  }
}
