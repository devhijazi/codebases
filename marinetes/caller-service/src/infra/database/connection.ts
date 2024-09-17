import { connect } from '@marinetesio/database/typeorm/mysql';
import { Logger } from '@marinetesio/logger';

import { databaseConfig } from '@/config/database';

export async function connectDatabase(): Promise<void> {
  const logger = new Logger('Database');

  logger.debug('Connecting to mysql...');

  await connect(databaseConfig);

  logger.success('Connection to mysql successfully established.');
}
