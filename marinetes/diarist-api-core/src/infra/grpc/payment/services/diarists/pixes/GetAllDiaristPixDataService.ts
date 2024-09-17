import { UserPixData } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetAllDiaristPixDataServiceRequest {
  diaristId: string;
}

export type GetAllDiaristPixDataServiceResponse = Required<UserPixData>[];

export class GetAllDiaristPixDataService {
  async execute(
    request: GetAllDiaristPixDataServiceRequest,
  ): Promise<GetAllDiaristPixDataServiceResponse> {
    const { diaristId } = request;

    try {
      const {
        response: { pixes },
      } = await grpcPaymentService.getAllDiaristPixData({
        diarist_id: diaristId,
      });

      return pixes as Required<UserPixData>[];
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
