import type {
  DatabaseOptions,
  ConnectionOptions,
  ConnectionConfig,
} from './types';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import * as models from './models';

const mainConnectionOptions: ConnectionOptions = {
  type: 'mysql',
  namingStrategy: new SnakeNamingStrategy(),

  entities: Object.values(models),
};

export const makeConfig = (
  databaseOptions: DatabaseOptions,
): ConnectionConfig => {
  return {
    connectionOptions: {
      ...databaseOptions,
      ...mainConnectionOptions,
    },
  };
};
