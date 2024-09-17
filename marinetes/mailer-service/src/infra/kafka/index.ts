import 'dotenv/config';

import { Logger } from '@marinetesio/logger';

import { startConsumer } from './consumer';

startConsumer().then(() => {
  const logger = new Logger('Kafka');

  logger.success('Consumer running.');
});
