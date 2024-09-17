import { UserRepository } from '@marinetesio/database/typeorm/mysql';
import { BadRequestError, UserNotFoundError } from '@marinetesio/errors';
import { User } from '@marinetesio/types/model';
import { Job } from 'bullmq';

import { Service } from '@/core/infra/Service';
import { UserQueueData, userQueue } from '@/infra/queue/queues/UserQueue';

export interface GetLastUserInQueueServiceResponse {
  userJob: Job<UserQueueData, boolean, string>;
  userJobData: UserQueueData;
  user: User;
}

export class GetLastUserInQueueService implements Service {
  async execute(): Promise<GetLastUserInQueueServiceResponse> {
    const usersQueueJobs = await userQueue.getJobs();

    const usersJobsSorted = usersQueueJobs
      .filter(job => !job.data.accpetedMatching)
      .sort((a, b) => Number(b.id) - Number(a.id));

    if (!usersJobsSorted.length) {
      throw new BadRequestError();
    }

    const usersJobsLastIndex = usersJobsSorted.length - 1;

    const userJob = usersJobsSorted[usersJobsLastIndex];
    const userJobData = userJob.data;

    const user = await UserRepository.findOne({
      where: { id: userJobData.userId },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      userJob,
      userJobData,
      user,
    };
  }
}
