import { DiaristTransfer } from '@marinetesio/protos/protobuf';
import { DiaristTransferOperationType } from '@marinetesio/types/model';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface CreateDiaristTransferServiceRequest {
  diaristId: string;
  value: number;
  operationType: DiaristTransferOperationType;
  pixDataId?: string;
}

export type CreateDiaristTransferServiceResponse = Required<DiaristTransfer>;

export class CreateDiaristTransferService {
  async execute(
    request: CreateDiaristTransferServiceRequest,
  ): Promise<CreateDiaristTransferServiceResponse> {
    const { diaristId, value, pixDataId, operationType } = request;

    try {
      const {
        response: { transfer },
      } = await grpcPaymentService.createDiaristTransfer({
        diarist_id: diaristId,
        operation_type: operationType,
        value,
        pix_data_id: pixDataId,
      });

      return transfer as Required<DiaristTransfer>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
