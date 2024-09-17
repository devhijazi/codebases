/* eslint-disable no-restricted-syntax */

interface ConnectionData {
  entityId: string;
}

const connections = new Map<string, ConnectionData>();

function addConnection(socketId: string, data: ConnectionData): void {
  connections.set(socketId, data);
}

function removeConnection(socketId: string): void {
  connections.delete(socketId);
}

function hasConnectionByEntityId(entityId: string): boolean {
  for (const [, data] of connections.entries()) {
    if (data.entityId === entityId) {
      return true;
    }
  }

  return false;
}

function getConnectionByEntityId(
  entityId: string,
): { socket: string; data: ConnectionData } | null {
  for (const [socket, data] of connections.entries()) {
    if (data.entityId === entityId) {
      return {
        socket,
        data,
      };
    }
  }

  return null;
}

export type { ConnectionData };

export {
  connections,
  addConnection,
  removeConnection,
  hasConnectionByEntityId,
  getConnectionByEntityId,
};
