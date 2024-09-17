import { connect } from '@marinetes/database';
import type { Connection } from 'typeorm';

import { databaseConfig } from '@config/database';

export function connectToDatabase(): Promise<Connection> {
  return connect(databaseConfig);
}
