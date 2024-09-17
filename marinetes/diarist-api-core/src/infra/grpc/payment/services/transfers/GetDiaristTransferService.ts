import { DiaristTransfer } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetDiaristTransferServiceRequest {
  transferId: string;
}

export type GetDiaristTransferServiceResponse = Required<DiaristTransfer>;

export class GetDiaristTransferService {
  async execute(
    request: GetDiaristTransferServiceRequest,
  ): Promise<GetDiaristTransferServiceResponse> {
    const { transferId } = request;

    try {
      const {
        response: { transfer },
      } = await grpcPaymentService.getDiaristTransfer({
        transfer_id: transferId,
      });

      return transfer as Required<DiaristTransfer>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
