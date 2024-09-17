import { Queue, QueueOptions } from 'bullmq';

import { connection } from '@/config/bullmq';

export interface UserQueueData {
  userId: string;
  budgetId: string;
  accpetedMatching: boolean;
  relatedDiaristId?: string | null;
}

export type UserQueueResult = boolean;

export const userQueueName = 'user';

export const userQueuePrefix = 'bullmq:marinetes:caller:user-queue';

export const userQueueConfig: QueueOptions = {
  connection,
  prefix: userQueuePrefix,
  defaultJobOptions: {
    attempts: 1,
  },
};

export const userQueue = new Queue<UserQueueData, UserQueueResult>(
  userQueueName,
  userQueueConfig,
);
