import { UserTransfer } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetUserTransferServiceRequest {
  transferId: string;
}

export type GetUserTransferServiceResponse = Required<UserTransfer>;

export class GetUserTransferService {
  async execute(
    request: GetUserTransferServiceRequest,
  ): Promise<GetUserTransferServiceResponse> {
    const { transferId } = request;

    try {
      const {
        response: { transfer },
      } = await grpcPaymentService.getUserTransfer({
        transfer_id: transferId,
      });

      return transfer as Required<UserTransfer>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
