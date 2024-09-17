import { UserPayment } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetAllUserPaymentsServiceRequest {
  userId: string;
}

export type GetAllUserPaymentsServiceResponse = Required<UserPayment>[];

export class GetAllUserPaymentsService {
  async execute(
    request: GetAllUserPaymentsServiceRequest,
  ): Promise<GetAllUserPaymentsServiceResponse> {
    const { userId } = request;

    try {
      const {
        response: { payments },
      } = await grpcPaymentService.getAllUserPayments({
        user_id: userId,
      });

      return payments as Required<UserPayment>[];
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
