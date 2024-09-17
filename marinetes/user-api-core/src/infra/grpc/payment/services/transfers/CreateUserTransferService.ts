import { UserTransfer } from '@marinetesio/protos/protobuf';
import { UserTransferOperationType } from '@marinetesio/types/model';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface CreateUserTransferServiceRequest {
  userId: string;
  value: number;
  operationType: UserTransferOperationType;
  pixDataId: string;
}

export type CreateUserTransferServiceResponse = Required<UserTransfer>;

export class CreateUserTransferService {
  async execute(
    request: CreateUserTransferServiceRequest,
  ): Promise<CreateUserTransferServiceResponse> {
    const { userId, value, pixDataId, operationType } = request;

    try {
      const {
        response: { transfer },
      } = await grpcPaymentService.createUserTransfer({
        user_id: userId,
        operation_type: operationType,
        value,
        pix_data_id: pixDataId,
      });

      return transfer as Required<UserTransfer>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
