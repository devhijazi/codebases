import type {
  SessionLoginData,
  SessionLoginDocument,
} from '@marinetesio/types/dtos/diarist/api';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { ForbiddenError, RegisterNotFoundError } from '@marinetesio/errors';
import { PasswordHelper } from '@marinetesio/password-helper';

import { DiaristGetService } from '@/infra/http/services/diarist/DiaristGetService';
import { SessionTokenHelper } from '@/shared/helpers/token/SessionTokenHelper';

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
