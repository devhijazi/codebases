import { UserPayment } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetUserPaymentServiceRequest {
  paymentId: string;
}

export type GetUserPaymentServiceResponse = Required<UserPayment>;

export class GetUserPaymentService {
  async execute(
    request: GetUserPaymentServiceRequest,
  ): Promise<GetUserPaymentServiceResponse> {
    const { paymentId } = request;

    try {
      const {
        response: { payment },
      } = await grpcPaymentService.getUserPayment({
        payment_id: paymentId,
      });

      return payment as Required<UserPayment>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
