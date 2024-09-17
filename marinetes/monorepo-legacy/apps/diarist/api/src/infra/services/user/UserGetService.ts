import { UserRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { UserDocument } from '@marinetes/types/dtos/diarist/api';
import { instanceToPlain } from 'class-transformer';

export class UserGetService implements Service {
  async execute(userId: string): Promise<UserDocument> {
    const user = await UserRepository.createQueryBuilder('user')
      .where({ id: userId })
      .select(['user.id', 'user.full_name', 'user.avatar'])
      .getOne();

    if (!user) {
      throw new RegisterNotFoundError();
    }

    return instanceToPlain(user) as UserDocument;
  }
}
