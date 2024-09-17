import * as grpc from '@grpc/grpc-js';
import { Logger } from '@hitechline/logger';

import { environment } from '@/config/environment';

import { cdnService, cdnImplementation } from './services/CdnService';

const { grpcServerUrl } = environment;

export async function startGRPCServer(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const server = new grpc.Server();

    const logger = new Logger('gRPC');

    server.addService(cdnService, cdnImplementation);

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
