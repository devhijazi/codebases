import type { DatabaseOptions } from '@marinetes/database';

export const databaseConfig: DatabaseOptions = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  username: process.env.MYSQL_USERNAME,
};
