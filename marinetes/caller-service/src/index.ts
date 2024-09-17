import 'dotenv/config';
import 'express-async-errors';
import { connectDatabase } from './infra/database';
import { connectPaymentKafkaProducer } from './infra/kafka';
import { processWorkers } from './infra/queue';
import { connectRedis } from './infra/queue/redis';
import { startServer } from './infra/server/server';
import { startWebSocketServer } from './infra/websocket';

(async () => {
  await connectPaymentKafkaProducer();

  await connectDatabase();
  await connectRedis();

  startServer();
  startWebSocketServer();

  processWorkers();
})();
