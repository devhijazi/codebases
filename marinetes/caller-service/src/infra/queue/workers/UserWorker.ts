import { Worker, WorkerOptions } from 'bullmq';

import { connection } from '@/config/bullmq';
import { CreateUserMatchingService } from '@/infra/services/queues/user/CreateUserMatchingService';

import { userQueue, userQueuePrefix } from '../queues/UserQueue';

export interface UserWorkerData {
  userId: string;
  budgetId: string;
  accpetedMatching: boolean;
  relatedDiaristId?: string | null;
}

export type UserWorkerResult = boolean;

export const userWorkerName = userQueue.name;

export const userWorkerConfig: WorkerOptions = {
  connection,
  prefix: userQueuePrefix,
  concurrency: 100,
  autorun: false,
};

export const userWorker = new Worker<UserWorkerData, UserWorkerResult>(
  userWorkerName,
  async userJob => {
    const userJobData = userJob.data;

    const createUserMatching = new CreateUserMatchingService();

    try {
      await createUserMatching.execute({ userJob, userJobData });

      return true;
    } catch {
      return false;
    }
  },
  userWorkerConfig,
);
