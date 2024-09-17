import { connect } from '@marinetesio/database/typeorm/mysql';
import { Logger } from '@marinetesio/logger';

import { typeormConfig } from '@/config/typeorm';

export async function connectDatabase(): Promise<void> {
  const logger = new Logger('Database');

  await connect(typeormConfig);

  logger.success('Connection successfully established.');
}
