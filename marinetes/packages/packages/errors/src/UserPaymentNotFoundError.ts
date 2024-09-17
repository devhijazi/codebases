import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class UserPaymentNotFoundError extends ErrorBase {
  get message(): string {
    return 'Payment does not exists.';
  }

  get code(): string {
    return 'UserPaymentNotFoundError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
