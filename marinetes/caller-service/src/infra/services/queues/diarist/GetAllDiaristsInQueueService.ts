import { Service } from '@/core/infra/Service';
import {
  DiaristQueueData,
  diaristQueue,
} from '@/infra/queue/queues/DiaristQueue';

export type GetAllDiaristsInQueueServiceResponse = (DiaristQueueData & {
  jobId: string;
})[];

export class GetAllDiaristsInQueueService implements Service {
  async execute(): Promise<GetAllDiaristsInQueueServiceResponse> {
    const diaristQueueJobs = await diaristQueue.getJobs();

    const diaristsInQueue = diaristQueueJobs
      .sort((a, b) => Number(b.id) - Number(a.id))
      .map(job => ({
        jobId: job.id as string,
        ...job.data,
      }));

    return diaristsInQueue;
  }
}
