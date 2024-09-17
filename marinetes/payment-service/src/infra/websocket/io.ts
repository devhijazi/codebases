import {
  DiaristRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import { Logger } from '@marinetesio/logger';
import { Server } from 'socket.io';

import { addConnection, removeConnection } from './utils/connection';
import { Events } from './utils/constants';

const logger = new Logger('WebSocket');

const io = new Server({
  cors: {
    origin: '*',
  },
});

io.on(Events.connection, async socket => {
  const { entityType, entityId } = socket.handshake.query as {
    entityType: 'user' | 'diarist';
    entityId: string;
  };

  if (
    !entityType ||
    !['user', 'diarist'].includes(entityType.toLowerCase()) ||
    !entityId
  ) {
    return;
  }

  let entityFullName = '';

  if (entityType === 'user') {
    const hasUser = await UserRepository.findOne({
      where: { id: entityId },
    });

    if (!hasUser) {
      return;
    }

    entityFullName = hasUser.full_name;
  }

  if (entityType === 'diarist') {
    const hasDiarist = await DiaristRepository.findOne({
      where: { id: entityId },
    });

    if (!hasDiarist) {
      return;
    }

    entityFullName = hasDiarist.full_name;
  }

  socket.join(entityId);

  addConnection(socket.id, { entityId });

  logger.info(`Connected | ${socket.id} | ${entityType} | ${entityFullName}`);

  socket.on(Events.disconnect, () => {
    removeConnection(socket.id);

    logger.info(
      `Disconnected | ${socket.id} | ${entityType} | ${entityFullName}`,
    );
  });
});

export { io, logger };
