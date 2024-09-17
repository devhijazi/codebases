import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface DeleteUserPixDataServiceRequest {
  pixDataId: string;
}

export class DeleteUserPixDataService {
  async execute(request: DeleteUserPixDataServiceRequest): Promise<void> {
    const { pixDataId } = request;

    try {
      await grpcPaymentService.deleteUserPixData({
        pix_data_id: pixDataId,
      });
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
