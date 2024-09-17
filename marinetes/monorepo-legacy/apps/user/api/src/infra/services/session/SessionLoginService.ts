import { UserRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { PasswordHelper } from '@marinetes/password-helper';
import type {
  SessionLoginData,
  SessionLoginDocument,
} from '@marinetes/types/dtos/user/api';

import { SessionTokenHelper } from '@infra/helpers/token/SessionTokenHelper';
import { UserGetService } from '@infra/services/user/UserGetService';

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
