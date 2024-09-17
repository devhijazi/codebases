import type { DiaristDocument } from '@marinetesio/types/dtos/diarist/api';

import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { AuthenticationError } from '@marinetesio/errors';

import { SessionTokenHelper } from '@/shared/helpers/token/SessionTokenHelper';

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
