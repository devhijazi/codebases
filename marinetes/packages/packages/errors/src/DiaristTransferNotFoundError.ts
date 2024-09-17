import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class DiaristTransferNotFoundError extends ErrorBase {
  get message(): string {
    return 'Transfer does not exists.';
  }

  get code(): string {
    return 'DiaristTransferNotFoundError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
