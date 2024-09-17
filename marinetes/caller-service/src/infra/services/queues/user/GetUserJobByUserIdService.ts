import { UserRepository } from '@marinetesio/database/typeorm/mysql';
import { BadRequestError, UserNotFoundError } from '@marinetesio/errors';
import { User } from '@marinetesio/types/model';
import { Job } from 'bullmq';

import { Service } from '@/core/infra/Service';
import { UserQueueData, userQueue } from '@/infra/queue/queues/UserQueue';

export interface GetUserJobByUserIdServiceRequest {
  userId: string;
}

export interface GetUserJobByUserIdServiceResponse {
  userJob: Job<UserQueueData, boolean, string>;
  userJobData: UserQueueData;
  user: User;
}

export class GetUserJobByUserIdService implements Service {
  async execute(
    request: GetUserJobByUserIdServiceRequest,
  ): Promise<GetUserJobByUserIdServiceResponse> {
    const { userId } = request;

    const user = await UserRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const userQueueJobs = await userQueue.getJobs();

    const userJob = userQueueJobs.find(
      ({ data: jobData }) => jobData.userId === userId,
    );

    if (!userJob || !userJob.id) {
      throw new BadRequestError();
    }

    const userJobData = userJob.data;

    return {
      userJob,
      userJobData,
      user,
    };
  }
}
