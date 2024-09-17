import 'dotenv/config';
import 'express-async-errors';

import { connectDatabase } from './infra/database';
import { startGRPCServer } from './infra/grpc';
import { startServer } from './infra/http';
import {
  connectMailerKafkaProducer,
  startPaymentConsumer,
} from './infra/kafka';
import { startWebSocketServer } from './infra/websocket';

(async () => {
  await connectDatabase();

  startServer();
  startWebSocketServer();
  await startGRPCServer();

  await startPaymentConsumer();
  await connectMailerKafkaProducer();
})();
