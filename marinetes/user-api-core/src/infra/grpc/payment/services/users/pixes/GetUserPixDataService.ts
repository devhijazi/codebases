import { UserPixData } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetUserPixDataServiceRequest {
  pixDataId: string;
}

export type GetUserPixDataServiceResponse = Required<UserPixData>;

export class GetUserPixDataService {
  async execute(
    request: GetUserPixDataServiceRequest,
  ): Promise<GetUserPixDataServiceResponse> {
    const { pixDataId } = request;

    try {
      const {
        response: { pix_data },
      } = await grpcPaymentService.getUserPixData({
        pix_data_id: pixDataId,
      });

      return pix_data as Required<UserPixData>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
