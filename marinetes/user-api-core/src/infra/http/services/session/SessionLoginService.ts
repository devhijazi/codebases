import type {
  SessionLoginData,
  SessionLoginDocument,
} from '@marinetesio/types/dtos/user/api';

import { UserRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { PasswordHelper } from '@marinetesio/password-helper';

import { UserGetService } from '@/infra/http/services/user/UserGetService';
import { SessionTokenHelper } from '@/shared/helpers/token/SessionTokenHelper';

import { SessionCreateRefreshTokenService } from './SessionCreateRefreshTokenService';

export class SessionLoginService implements Service {
  async execute({
    stay,
    email,
    password,
  }: SessionLoginData): Promise<SessionLoginDocument> {
    const findedUser = await UserRepository.findOne({
      select: ['id', 'email', 'password'],
      where: {
        email,
      },
    });

    if (!findedUser) {
      throw new RegisterNotFoundError();
    }

    await PasswordHelper.compare(password, findedUser.password);

    const userGet = new UserGetService();
    const user = await userGet.execute(findedUser.id);

    const data: SessionLoginDocument = {
      token: SessionTokenHelper.create(user.id),
      refreshToken: null,
      user,
    };

    if (stay) {
      const sessionCreateRefreshToken = new SessionCreateRefreshTokenService();
      const refreshToken = await sessionCreateRefreshToken.execute(user.id);

      Object.assign(data, {
        refreshToken,
      });
    }

    return data;
  }
}
