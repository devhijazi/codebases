import { DiaristTransfer } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetAllDiaristTransfersServiceRequest {
  diaristId: string;
}

export type GetAllDiaristTransfersServiceResponse = Required<DiaristTransfer>[];

export class GetAllDiaristTransfersService {
  async execute(
    request: GetAllDiaristTransfersServiceRequest,
  ): Promise<GetAllDiaristTransfersServiceResponse> {
    const { diaristId } = request;

    try {
      const {
        response: { transfers },
      } = await grpcPaymentService.getAllDiaristTransfers({
        diarist_id: diaristId,
      });

      return transfers as Required<DiaristTransfer>[];
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
