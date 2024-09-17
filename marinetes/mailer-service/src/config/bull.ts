import { QueueOptions } from 'bull';

import { environment } from './environment';

export const queueOptions: QueueOptions = {
  redis: {
    host: environment.redisHost,
    port: Number(environment.redisPort),
    password: environment.redisPassword,
  },
};
