import { RefreshTokenRepository } from '@marinetes/database';

import { SessionTokenHelper } from '@/infra/helpers/token/SessionTokenHelper';

export class SessionCreateRefreshTokenService implements Service {
  async execute(userId: string): Promise<string> {
    const token = SessionTokenHelper.createRefreshToken();
    const refreshToken = await RefreshTokenRepository.create({
      token,
      subject_id: userId,
    }).save();

    return refreshToken.token;
  }
}
