import { UserTransfer } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetAllUserTransfersServiceRequest {
  userId: string;
}

export type GetAllUserTransfersServiceResponse = Required<UserTransfer>[];

export class GetAllUserTransfersService {
  async execute(
    request: GetAllUserTransfersServiceRequest,
  ): Promise<GetAllUserTransfersServiceResponse> {
    const { userId } = request;

    try {
      const {
        response: { transfers },
      } = await grpcPaymentService.getAllUserTransfers({
        user_id: userId,
      });

      return transfers as Required<UserTransfer>[];
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
