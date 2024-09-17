import { createConnection, Connection, ConnectionOptions } from 'typeorm';

import type { ConnectionConfig } from '../types';

export class ConnectionManager {
  #connection: Connection | null = null;

  getConnection(): Connection | null {
    return this.#connection;
  }

  async createConnection(config: ConnectionConfig): Promise<Connection> {
    if (this.#connection) {
      return this.#connection;
    }

    const connectionOptions: ConnectionOptions = {
      ...config.connectionOptions,
      name: config.name ?? 'default',
    };

    const connection = await createConnection(connectionOptions);

    this.#connection = connection;
    return connection;
  }
}
