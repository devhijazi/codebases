import { Logger } from '@hitechline/logger';

import { environment } from '@/config/environment';

import { app } from './app';

const { expressServerPort } = environment;

export function startServer(): void {
  const logger = new Logger('HTTP');

  app.listen(expressServerPort, () =>
    logger.success(`Server running in port "${expressServerPort}".`),
  );
}
