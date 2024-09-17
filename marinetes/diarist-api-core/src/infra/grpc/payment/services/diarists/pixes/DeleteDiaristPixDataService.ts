import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface DeleteDiaristPixDataServiceRequest {
  pixDataId: string;
}

export class DeleteDiaristPixDataService {
  async execute(request: DeleteDiaristPixDataServiceRequest): Promise<void> {
    const { pixDataId } = request;

    try {
      await grpcPaymentService.deleteDiaristPixData({
        pix_data_id: pixDataId,
      });
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
