import { RedisOptions } from 'bullmq';

import { environment } from './environment';

export const connection: RedisOptions = {
  host: environment.redisHost,
  port: Number(environment.redisPort),
  password: environment.redisPassword,
  enableOfflineQueue: false,
};
