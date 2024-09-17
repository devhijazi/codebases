import {
  DiaristRepository,
  DiaristWalletRepository,
} from '@marinetesio/database/typeorm/mysql';
import { DiaristNotFoundError } from '@marinetesio/errors';
import { DiaristWallet } from '@marinetesio/types/model';

export interface GetDiaristWalletServiceRequest {
  diaristId: string;
}

export type GetDiaristWalletServiceResponse = DiaristWallet;

export class GetDiaristWalletService {
  async execute(
    request: GetDiaristWalletServiceRequest,
  ): Promise<GetDiaristWalletServiceResponse> {
    const { diaristId } = request;

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
      relations: ['wallet'],
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    if (!diarist.wallet) {
      const wallet = await DiaristWalletRepository.create({
        balance: 0,
      }).save();

      diarist.wallet = wallet;
      diarist.save();

      return wallet;
    }

    return diarist.wallet;
  }
}
