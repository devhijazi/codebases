import { UserPixDataKeyType } from '@marinetesio/types/model/model';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface UpdateUserPixDataServiceRequest {
  pixDataId: string;
  key: string;
  keyType: UserPixDataKeyType;
}

export class UpdateUserPixDataService {
  async execute(request: UpdateUserPixDataServiceRequest): Promise<void> {
    const { pixDataId, key, keyType } = request;

    try {
      await grpcPaymentService.updateUserPixData({
        pix_data_id: pixDataId,
        key,
        key_type: keyType,
      });
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
