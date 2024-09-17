import { UserRepository, UserAddressRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { UserAddressCreateData } from '@marinetes/types/dtos/user/api';

export class UserAddressCreateService implements Service {
  async execute(userId: string, data: UserAddressCreateData): Promise<void> {
    const user = await UserRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.addresses', 'address')
      .where({ id: userId })
      .select(['user.id', 'address.id'])
      .getOne();

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const address = await UserAddressRepository.create(data).save();

    user.addresses.push(address);

    await user.save();
  }
}
