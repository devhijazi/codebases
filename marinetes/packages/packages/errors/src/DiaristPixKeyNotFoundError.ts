import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class DiaristPixKeyNotFoundError extends ErrorBase {
  get message(): string {
    return 'Pix key does not exists.';
  }

  get code(): string {
    return 'DiaristPixKeyNotFoundError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
