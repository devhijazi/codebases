import { UserPayment } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface CreateUserPaymentServiceRequest {
  userId: string;
  value: number;
  method: string;
}

export type CreateUserPaymentServiceResponse = Required<UserPayment>;

export class CreateUserPaymentService {
  async execute(
    request: CreateUserPaymentServiceRequest,
  ): Promise<CreateUserPaymentServiceResponse> {
    const { userId, value, method } = request;

    try {
      const {
        response: { payment },
      } = await grpcPaymentService.createUserPayment({
        user_id: userId,
        value,
        method,
      });

      return payment as Required<UserPayment>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
