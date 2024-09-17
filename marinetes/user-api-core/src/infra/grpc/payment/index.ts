import { ChannelCredentials } from '@grpc/grpc-js';
import { PaymentServiceClient } from '@marinetesio/protos/protobuf';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';

import { environment } from '@/config/environment';

export const grpcPaymentTransport = new GrpcTransport({
  host: environment.grpcPaymentServiceUrl,
  channelCredentials: ChannelCredentials.createInsecure(),
});

export const grpcPaymentService = new PaymentServiceClient(
  grpcPaymentTransport,
);
