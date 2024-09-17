import { Service } from '@/core/infra/Service';
import { UserQueueData, userQueue } from '@/infra/queue/queues/UserQueue';

export type GetAllUsersInQueueServiceResponse = (UserQueueData & {
  jobId: string;
})[];

export class GetAllUsersInQueueService implements Service {
  async execute(): Promise<GetAllUsersInQueueServiceResponse> {
    const userQueueJobs = await userQueue.getJobs();

    const usersInQueue = userQueueJobs
      .sort((a, b) => Number(b.id) - Number(a.id))
      .map(job => ({
        jobId: job.id as string,
        ...job.data,
      }));

    return usersInQueue;
  }
}
