import type { UserAddressDocument } from '@marinetesio/types/dtos/user/api';

import { UserRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

export class UserAddressesGetService implements Service {
  async execute(userId: string): Promise<UserAddressDocument[]> {
    const user = await UserRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.addresses', 'address')
      .where({ id: userId })
      .select([
        'user.id',
        'address.id',
        'address.title',
        'address.type',
        'address.category',
        'address.rooms',
        'address.square_meters',
        'address.zip_code',
        'address.state',
        'address.city',
        'address.neighborhood',
        'address.street',
        'address.number',
        'address.complement',
      ])
      .getOne();

    if (!user) {
      throw new RegisterNotFoundError();
    }

    return user.addresses;
  }
}
