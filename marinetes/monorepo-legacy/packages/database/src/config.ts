import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import * as models from './models-import';
import type {
  DatabaseOptions,
  ConnectionOptions,
  ConnectionConfig,
} from './types';

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
