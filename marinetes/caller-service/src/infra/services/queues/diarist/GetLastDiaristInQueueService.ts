import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { BadRequestError, DiaristNotFoundError } from '@marinetesio/errors';
import { Diarist } from '@marinetesio/types/model';
import { Job } from 'bullmq';

import { Service } from '@/core/infra/Service';
import {
  DiaristQueueData,
  diaristQueue,
} from '@/infra/queue/queues/DiaristQueue';

export interface GetLastDiaristInQueueServiceResponse {
  diaristJob: Job<DiaristQueueData, boolean, string>;
  diaristJobData: DiaristQueueData;
  diarist: Diarist;
}

export class GetLastDiaristInQueueService implements Service {
  async execute(): Promise<GetLastDiaristInQueueServiceResponse> {
    const diaristsQueueJobs = await diaristQueue.getJobs();

    const diaristsJobsSorted = diaristsQueueJobs
      .filter(job => !job.data.accpetedMatching)
      .sort((a, b) => Number(b.id) - Number(a.id));

    if (!diaristsJobsSorted.length) {
      throw new BadRequestError();
    }

    const diaristsJobsLastIndex = diaristsJobsSorted.length - 1;

    const diaristJob = diaristsJobsSorted[diaristsJobsLastIndex];
    const diaristJobData = diaristJob.data;

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristJobData.diaristId },
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    return {
      diaristJob,
      diaristJobData,
      diarist,
    };
  }
}
