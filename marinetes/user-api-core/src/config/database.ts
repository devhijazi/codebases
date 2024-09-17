import type { DatabaseOptions } from '@marinetesio/database/typeorm/mysql';

export const typeormConfig: DatabaseOptions = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  username: process.env.MYSQL_USERNAME,
};
