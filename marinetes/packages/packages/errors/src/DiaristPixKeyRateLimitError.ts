import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class DiaristPixKeyRateLimitError extends ErrorBase {
  get message(): string {
    return 'Key limit reached.';
  }

  get code(): string {
    return 'DiaristPixKeyRateLimitError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
