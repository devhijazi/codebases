import { DiaristWallet } from '@marinetesio/protos/protobuf';

import { getGrpcError } from '@/core/infra/grpc/GrpcResponse';
import { grpcPaymentService } from '@/infra/grpc/payment';

export interface GetDiaristWalletServiceRequest {
  diaristId: string;
}

export type GetDiaristWalletServiceResponse = Required<DiaristWallet>;

export class GetDiaristWalletService {
  async execute(
    request: GetDiaristWalletServiceRequest,
  ): Promise<GetDiaristWalletServiceResponse> {
    const { diaristId } = request;

    try {
      const {
        response: { wallet },
      } = await grpcPaymentService.getDiaristWallet({
        diarist_id: diaristId,
      });

      return {
        ...wallet,
        balance: wallet?.balance ?? 0,
      } as Required<DiaristWallet>;
    } catch (error) {
      throw getGrpcError(error);
    }
  }
}
