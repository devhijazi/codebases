import { Worker, WorkerOptions } from 'bullmq';

import { connection } from '@/config/bullmq';
import { CreateDiaristMatchingService } from '@/infra/services/queues/diarist/CreateDiaristMatchingService';

import { diaristQueue, diaristQueuePrefix } from '../queues/DiaristQueue';

export interface DiaristWorkerData {
  diaristId: string;
  accpetedMatching: boolean;
  relatedUserId?: string | null;
}

export type DiaristWorkerResult = boolean;

export const diaristWorkerName = diaristQueue.name;

export const diaristWorkerConfig: WorkerOptions = {
  connection,
  prefix: diaristQueuePrefix,
  concurrency: 100,
  autorun: false,
};

export const diaristWorker = new Worker<DiaristWorkerData>(
  diaristWorkerName,
  async diaristJob => {
    const diaristJobData = diaristJob.data;

    const createDiaristMatching = new CreateDiaristMatchingService();

    try {
      await createDiaristMatching.execute({ diaristJob, diaristJobData });

      return true;
    } catch {
      return false;
    }
  },
  diaristWorkerConfig,
);
