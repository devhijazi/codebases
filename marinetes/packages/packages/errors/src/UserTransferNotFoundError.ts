import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class UserTransferNotFoundError extends ErrorBase {
  get message(): string {
    return 'Transfer does not exists.';
  }

  get code(): string {
    return 'UserTransferNotFoundError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
