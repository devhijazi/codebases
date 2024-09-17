import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class UserPixKeyNotFoundError extends ErrorBase {
  get message(): string {
    return 'Pix key does not exists.';
  }

  get code(): string {
    return 'UserPixKeyNotFoundError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
