import 'dotenv/config';
import 'express-async-errors';
import { startGRPCServer } from './infra/grpc';
import { startServer } from './infra/http';

async function main(): Promise<void> {
  startServer();
  await startGRPCServer();
}

main();
