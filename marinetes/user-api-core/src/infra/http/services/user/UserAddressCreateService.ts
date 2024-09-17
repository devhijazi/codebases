import type { UserAddressCreateData } from '@marinetesio/types/dtos/user/api';

import {
  UserRepository,
  UserAddressRepository,
} from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

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
