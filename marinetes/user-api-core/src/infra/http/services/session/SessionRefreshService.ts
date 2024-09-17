import type {
  SessionRefreshData,
  SessionLoginRefreshDocument,
} from '@marinetesio/types/dtos/user/api';

import { RefreshTokenRepository } from '@marinetesio/database/typeorm/mysql';
import { TokenError } from '@marinetesio/errors';

import { SessionCreateRefreshTokenService } from '@/infra/http/services/session/SessionCreateRefreshTokenService';
import { SessionTokenHelper } from '@/shared/helpers/token/SessionTokenHelper';

export class SessionRefreshService implements Service {
  async execute(
    data: SessionRefreshData,
  ): Promise<SessionLoginRefreshDocument> {
    const refreshToken = await RefreshTokenRepository.findOne({
      where: {
        token: data.refreshToken,
      },
    });

    if (!refreshToken) {
      throw new TokenError();
    }

    await RefreshTokenRepository.delete(refreshToken.id);

    const sessionCreateRefreshToken = new SessionCreateRefreshTokenService();
    const createdRefreshToken = await sessionCreateRefreshToken.execute(
      refreshToken.subject_id,
    );

    return {
      token: SessionTokenHelper.create(refreshToken.subject_id),
      refreshToken: createdRefreshToken,
    };
  }
}
