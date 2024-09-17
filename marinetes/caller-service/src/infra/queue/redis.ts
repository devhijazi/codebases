import { Logger } from '@marinetesio/logger';
import { RedisConnection } from 'bullmq';
import { Redis } from 'ioredis';

import { connection } from '@/config/bullmq';

export async function connectRedis(): Promise<void> {
  const logger = new Logger('Redis');

  logger.debug('Connecting to redis...');

  await RedisConnection.waitUntilReady(new Redis(connection));

  logger.success('Connection to redis successfully established.');
}
