import { RefreshTokenRepository } from '@marinetes/database';
import { TokenError } from '@marinetes/errors';
import type {
  SessionRefreshData,
  SessionLoginRefreshDocument,
} from '@marinetes/types/dtos/diarist/api';

import { SessionTokenHelper } from '@/infra/helpers/token/SessionTokenHelper';
import { SessionCreateRefreshTokenService } from '@/infra/services/session/SessionCreateRefreshTokenService';

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
