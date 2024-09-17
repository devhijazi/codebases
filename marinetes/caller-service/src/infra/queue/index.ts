import 'dotenv/config';

import { Logger } from '@marinetesio/logger';

import { diaristWorker } from './workers/DiaristWorker';
import { userWorker } from './workers/UserWorker';

export async function processWorkers(): Promise<void> {
  const logger = new Logger('Worker');

  diaristWorker.run();
  userWorker.run();

  logger.info('Processing workers...');
}
