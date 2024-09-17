import 'dotenv/config';

import { join, resolve, relative } from 'path';

import type { ConnectionOptions } from 'typeorm';

import { makeConfig } from '../src/config';
import { DatabaseOptions } from '../src/types';

const extensions = ['js', 'ts'];

const migrationsPath = resolve(__dirname, '..', 'migrations');

const databaseOptions: DatabaseOptions = {
  port: (process.env.MYSQL_PORT || 3306) as number,
  host: process.env.MYSQL_HOST || 'localhost',
  database: process.env.MYSQL_DATABASE || 'marinetes',
  username: process.env.MYSQL_USERNAME || 'marinetes',
  password: process.env.MYSQL_PASSWORD || 'marinetes',
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
