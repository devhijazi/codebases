import 'dotenv/config';
import 'express-async-errors';

import { startServer } from './infra/http';
import { connectKafkaProducer } from './infra/kafka';
import { connectDatabase } from './infra/typeorm';

async function main(): Promise<void> {
  await connectKafkaProducer();

  await connectDatabase();

  startServer();
}

main();
