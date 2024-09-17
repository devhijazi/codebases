import { DiaristPixDataKeyType } from '@marinetesio/types/model/model';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface UpdateDiaristPixDataServiceRequest {
  pixDataId: string;
  key: string;
  keyType: DiaristPixDataKeyType;
}

export class UpdateDiaristPixDataService {
  async execute(request: UpdateDiaristPixDataServiceRequest): Promise<void> {
    const { pixDataId, key, keyType } = request;

    try {
      await grpcPaymentService.updateDiaristPixData({
        pix_data_id: pixDataId,
        key,
        key_type: keyType,
      });
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
