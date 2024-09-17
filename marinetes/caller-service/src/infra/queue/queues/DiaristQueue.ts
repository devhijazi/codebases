import { Queue, QueueOptions } from 'bullmq';

import { connection } from '@/config/bullmq';

export interface DiaristQueueData {
  diaristId: string;
  accpetedMatching: boolean;
  relatedUserId?: string | null;
}

export type DiaristQueueResult = boolean;

export const diaristQueueName = 'diarist';

export const diaristQueuePrefix = 'bullmq:marinetes:caller:diarist-queue';

export const diaristQueueConfig: QueueOptions = {
  connection,
  prefix: diaristQueuePrefix,
  defaultJobOptions: {
    attempts: 1,
  },
};

export const diaristQueue = new Queue<DiaristQueueData, DiaristQueueResult>(
  diaristQueueName,
  diaristQueueConfig,
);
