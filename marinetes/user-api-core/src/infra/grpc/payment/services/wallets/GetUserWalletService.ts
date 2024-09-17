import { UserWallet } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetUserWalletServiceRequest {
  userId: string;
}

export type GetUserWalletServiceResponse = Required<UserWallet>;

export class GetUserWalletService {
  async execute(
    request: GetUserWalletServiceRequest,
  ): Promise<GetUserWalletServiceResponse> {
    const { userId } = request;

    try {
      const {
        response: { wallet },
      } = await grpcPaymentService.getUserWallet({
        user_id: userId,
      });

      return {
        ...wallet,
        balance_available: wallet?.balance_available ?? 0,
        blocked_balance: wallet?.blocked_balance ?? 0,
      } as Required<UserWallet>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
