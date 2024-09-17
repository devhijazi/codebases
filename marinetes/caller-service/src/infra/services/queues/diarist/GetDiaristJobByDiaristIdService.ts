import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import {
  BadRequestError,
  DiaristNotFoundError,
  ForbiddenError,
} from '@marinetesio/errors';
import { Diarist } from '@marinetesio/types/model';
import { Job } from 'bullmq';

import { Service } from '@/core/infra/Service';
import {
  DiaristQueueData,
  diaristQueue,
} from '@/infra/queue/queues/DiaristQueue';

export interface GetDiaristJobByDiaristIdServiceRequest {
  diaristId: string;
}

export interface GetDiaristJobByDiaristIdServiceResponse {
  diaristJob: Job<DiaristQueueData, boolean, string>;
  diaristJobData: DiaristQueueData;
  diarist: Diarist;
}

export class GetDiaristJobByDiaristIdService implements Service {
  async execute(
    request: GetDiaristJobByDiaristIdServiceRequest,
  ): Promise<GetDiaristJobByDiaristIdServiceResponse> {
    const { diaristId } = request;

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
      relations: ['status'],
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    if (diarist.status.type !== 'active') {
      throw new ForbiddenError();
    }

    const diaristQueueJobs = await diaristQueue.getJobs();

    const diaristJob = diaristQueueJobs.find(
      ({ data: jobData }) => jobData.diaristId === diaristId,
    );

    if (!diaristJob || !diaristJob.id) {
      throw new BadRequestError();
    }

    const diaristJobData = diaristJob.data;

    return {
      diaristJob,
      diaristJobData,
      diarist,
    };
  }
}
