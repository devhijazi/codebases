import type { DatabaseOptions } from '@marinetesio/database/typeorm/mysql';

import { environment } from './environment';

export const databaseConfig: DatabaseOptions = {
  host: environment.mysqlHost,
  port: environment.mysqlPort,
  database: environment.mysqlDatabase,
  password: environment.mysqlPassword,
  username: environment.mysqlUsername,
};
