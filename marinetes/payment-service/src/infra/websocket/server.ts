import { environment } from '@/config/environment';

import { io, logger } from './io';

const { websocketServerPort } = environment;

export function startWebSocketServer(): void {
  io.listen(websocketServerPort);

  logger.success(`Server running in port "${websocketServerPort}".`);
}
