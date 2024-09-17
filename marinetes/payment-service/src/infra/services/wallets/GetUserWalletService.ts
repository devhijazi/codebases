import {
  UserRepository,
  UserWalletRepository,
} from '@marinetesio/database/typeorm/mysql';
import { UserNotFoundError } from '@marinetesio/errors';
import { UserWallet } from '@marinetesio/types/model';

export interface GetUserWalletServiceRequest {
  userId: string;
}

export type GetUserWalletServiceResponse = UserWallet;

export class GetUserWalletService {
  async execute(
    request: GetUserWalletServiceRequest,
  ): Promise<GetUserWalletServiceResponse> {
    const { userId } = request;

    const user = await UserRepository.findOne({
      where: { id: userId },
      relations: ['wallet'],
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.wallet) {
      const wallet = await UserWalletRepository.create({
        balance_available: 0,
        blocked_balance: 0,
      }).save();

      user.wallet = wallet;
      user.save();

      return wallet;
    }

    return user.wallet;
  }
}
