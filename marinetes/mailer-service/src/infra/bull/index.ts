import 'dotenv/config';

import { Logger } from '@marinetesio/logger';

import { MailerQueue } from './queues/MailerQueue';

async function main(): Promise<void> {
  const logger = new Logger('Bull');

  const mailerQueue = new MailerQueue();

  mailerQueue.process();

  logger.success('Processing queues...');
}

main();
