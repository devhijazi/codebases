import type { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export type ConnectionOptions = MysqlConnectionOptions;

export type DatabaseOptions = {
  port?: number;
  host: string;
  database: string;
  username: string;
  password: string;
};

export type ConnectionConfig = {
  name?: string;
  connectionOptions: ConnectionOptions;
};
