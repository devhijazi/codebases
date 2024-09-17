import { UserPixData } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetAllUserPixDataServiceRequest {
  userId: string;
}

export type GetAllUserPixDataServiceResponse = Required<UserPixData>[];

export class GetAllUserPixDataService {
  async execute(
    request: GetAllUserPixDataServiceRequest,
  ): Promise<GetAllUserPixDataServiceResponse> {
    const { userId } = request;

    try {
      const {
        response: { pixes },
      } = await grpcPaymentService.getAllUserPixData({
        user_id: userId,
      });

      return pixes as Required<UserPixData>[];
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
