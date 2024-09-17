import { UserPixData } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetDiaristPixDataServiceRequest {
  pixDataId: string;
}

export type GetDiaristPixDataServiceResponse = Required<UserPixData>;

export class GetDiaristPixDataService {
  async execute(
    request: GetDiaristPixDataServiceRequest,
  ): Promise<GetDiaristPixDataServiceResponse> {
    const { pixDataId } = request;

    try {
      const {
        response: { pix_data },
      } = await grpcPaymentService.getDiaristPixData({
        pix_data_id: pixDataId,
      });

      return pix_data as Required<UserPixData>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
