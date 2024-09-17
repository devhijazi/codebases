import 'dotenv/config';

import * as grpc from '@grpc/grpc-js';

import { channel } from '@/implementations/channel';
import { message } from '@/implementations/message';
import { connectToDatabase } from '@/prisma/connection';

const { PORT } = process.env;

function startServer(): void {
  const server = new grpc.Server();

  server.addService(...channel);
  server.addService(...message);

  const url = `localhost:${PORT}`;

  server.bindAsync(url, grpc.ServerCredentials.createInsecure(), () => {
    server.start();

    console.log(`gRPC server started on "http://${url}"`);
  });
}

connectToDatabase().then(() => startServer());
