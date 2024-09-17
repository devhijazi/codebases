import { UserRepository } from '@marinetes/database';
import { RegisterNotFoundError, BadRequestError } from '@marinetes/errors';

export class UserAddressDeleteService implements Service {
  async execute(userId: string, addressId: string): Promise<void> {
    const user = await UserRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.addresses', 'address')
      .where({ id: userId })
      .select(['user.id', 'address.id'])
      .getOne();

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const hasAddress = user.addresses.some(
      currentAddress => currentAddress.id === addressId,
    );

    if (!hasAddress) {
      throw new BadRequestError();
    }

    user.addresses = user.addresses.filter(address => address.id !== addressId);

    await user.save();
  }
}
