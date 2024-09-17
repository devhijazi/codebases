import { UserPixDataKeyType } from '@marinetesio/types/model/model';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface CreateUserPixDataServiceRequest {
  userId: string;
  key: string;
  keyType: UserPixDataKeyType;
}

export class CreateUserPixDataService {
  async execute(request: CreateUserPixDataServiceRequest): Promise<void> {
    const { userId, key, keyType } = request;

    try {
      await grpcPaymentService.createUserPixData({
        user_id: userId,
        key,
        key_type: keyType,
      });
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
