import { UserAddressRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { Request, Response, NextFunction } from 'express';

import { MiddlewareBase, buildMiddleware } from '@bases/MiddlewareBase';

class Middleware extends MiddlewareBase {
  async execute(
    { manager, params: { addressId } }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userAddress = await UserAddressRepository.findOne(addressId, {
      select: ['id'],
    });

    if (!userAddress) {
      throw new RegisterNotFoundError();
    }

    manager.setUserAddress(userAddress);
    next();
  }
}

export const UserAddressMiddleware = buildMiddleware(Middleware);
