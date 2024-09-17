import type { UserUpdateData } from '@marinetesio/types/dtos/user/api';

import { UserRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

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
