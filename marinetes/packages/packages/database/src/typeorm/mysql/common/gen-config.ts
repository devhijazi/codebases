import 'dotenv/config';

import type { ConnectionOptions } from 'typeorm';

import { join, resolve, relative } from 'path';

import { makeConfig } from '../config';
import { DatabaseOptions } from '../types';

const extensions = ['js', 'ts'];

const migrationsPath = resolve(__dirname, '..', 'migrations');

const databaseOptions: DatabaseOptions = {
  port: (process.env.MYSQL_PORT || 3306) as number,
  host: process.env.MYSQL_HOST || 'localhost',
  database: process.env.MYSQL_DATABASE || 'marinetes',
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'docker',
};

const databaseConfig = makeConfig(databaseOptions);

const migrations = extensions.map(extension =>
  join(migrationsPath, `*.${extension}`),
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete databaseConfig.connectionOptions.entities;

const config: ConnectionOptions = {
  ...databaseConfig.connectionOptions,

  migrations,

  cli: {
    migrationsDir: relative(process.cwd(), migrationsPath),
  },
};

export default config;
