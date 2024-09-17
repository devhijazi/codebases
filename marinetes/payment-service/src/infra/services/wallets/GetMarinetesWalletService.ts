import { MarinetesWalletRepository } from '@marinetesio/database/typeorm/mysql';
import { MarinetesWallet } from '@marinetesio/types/model';

export type GetMarinetesWalletServiceResponse = MarinetesWallet;

export class GetMarinetesWalletService {
  async execute(): Promise<GetMarinetesWalletServiceResponse> {
    const [walletFounded] = await MarinetesWalletRepository.find({ take: 1 });

    if (walletFounded) {
      return walletFounded;
    }

    const walletCreated = await MarinetesWalletRepository.create({
      balance: 0,
    }).save();

    return walletCreated;
  }
}
