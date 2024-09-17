import { DiaristRepository } from '@marinetes/database';
import { AuthenticationError } from '@marinetes/errors';
import type { DiaristDocument } from '@marinetes/types/dtos/diarist/api';

import { SessionTokenHelper } from '@/infra/helpers/token/SessionTokenHelper';

export class SessionTokenGetUserService implements Service {
  async execute(authorization?: string): Promise<DiaristDocument> {
    if (!authorization) {
      throw new AuthenticationError();
    }

    const [tokenType, token] = authorization.split(/[ \t]+/);

    if (tokenType.toLowerCase() !== 'bearer') {
      throw new AuthenticationError();
    }

    if (!token) {
      throw new AuthenticationError();
    }

    const tokenIsValid = SessionTokenHelper.verify(token);

    if (!tokenIsValid) {
      throw new AuthenticationError();
    }

    const { sub: userId } = SessionTokenHelper.decode(token);

    const diarist = await DiaristRepository.findOne(userId, {
      select: ['id'],
    });

    if (diarist) {
      return diarist;
    }

    throw new AuthenticationError();
  }
}
