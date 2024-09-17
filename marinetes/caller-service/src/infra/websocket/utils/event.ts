import { io } from '../io';
import { Events } from './constants';

type Event = typeof Events[keyof typeof Events];

function emitToAll(event: Event, data: unknown): void {
  io.emit(event, data);
}

function emitToEntity(entityId: string, event: Event, data?: unknown): void {
  io.to(entityId).emit(event, data);
}

export { emitToAll, emitToEntity };
