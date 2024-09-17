import { UserRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { UserUpdateData } from '@marinetes/types/dtos/user/api';

export class UserUpdateService implements Service {
  async execute(userId: string, data: UserUpdateData): Promise<void> {
    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new RegisterNotFoundError();
    }

    await UserRepository.update(user.id, data);
  }
}
