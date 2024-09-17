import { DiaristRepository } from '@marinetes/database';
import { ForbiddenError, RegisterNotFoundError } from '@marinetes/errors';
import { PasswordHelper } from '@marinetes/password-helper';
import type {
  SessionLoginData,
  SessionLoginDocument,
} from '@marinetes/types/dtos/diarist/api';

import { SessionTokenHelper } from '@infra/helpers/token/SessionTokenHelper';
import { DiaristGetService } from '@infra/services/diarist/DiaristGetService';

import { SessionCreateRefreshTokenService } from './SessionCreateRefreshTokenService';

export class SessionLoginService implements Service {
  async execute({
    stay,
    email,
    password,
  }: SessionLoginData): Promise<SessionLoginDocument> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .orWhere({ email })
      .innerJoinAndSelect('diarist.status', 'status')
      .select([
        'diarist.id',
        'diarist.email',
        'diarist.password',
        'status.type',
      ])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    if (!diarist.password || diarist.status.type !== 'active') {
      throw new ForbiddenError();
    }

    await PasswordHelper.compare(password, diarist.password);

    const diaristGet = new DiaristGetService();
    const user = await diaristGet.execute(diarist.id);

    const data: SessionLoginDocument = {
      token: SessionTokenHelper.create(diarist.id),
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
