import * as grpc from '@grpc/grpc-js';
import { Logger } from '@marinetesio/logger';

import { environment } from '@/config/environment';

import {
  paymentImplementation,
  paymentService,
} from './services/PaymentService';

const { grpcServerUrl } = environment;

export async function startGRPCServer(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const server = new grpc.Server();

    const logger = new Logger('gRPC');

    server.addService(paymentService, paymentImplementation);

    server.bindAsync(
      grpcServerUrl,
      grpc.ServerCredentials.createInsecure(),
      error => {
        if (error) {
          reject(error);

          return;
        }

        server.start();

        logger.success(`gRPC started on "${grpcServerUrl}".`);

        resolve();
      },
    );
  });
}
