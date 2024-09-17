import { DiaristPixDataKeyType } from '@marinetesio/types/model/model';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface CreateDiaristPixDataServiceRequest {
  diaristId: string;
  key: string;
  keyType: DiaristPixDataKeyType;
}

export class CreateDiaristPixDataService {
  async execute(request: CreateDiaristPixDataServiceRequest): Promise<void> {
    const { diaristId, key, keyType } = request;

    try {
      await grpcPaymentService.createDiaristPixData({
        diarist_id: diaristId,
        key,
        key_type: keyType,
      });
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
