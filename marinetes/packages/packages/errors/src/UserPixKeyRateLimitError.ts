import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class UserPixKeyRateLimitError extends ErrorBase {
  get message(): string {
    return 'Key limit reached.';
  }

  get code(): string {
    return 'UserPixKeyRateLimitError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
