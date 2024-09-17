import type { DatabaseOptions } from './types';
import type { Connection } from 'typeorm';

import { makeConfig } from './config';
import { ConnectionManager } from './core/ConnectionManager';

export async function connect(
  databaseOptions: DatabaseOptions,
): Promise<Connection> {
  const connectionManager = new ConnectionManager();
  const connection = await connectionManager.createConnection(
    makeConfig(databaseOptions),
  );

  return connection;
}
