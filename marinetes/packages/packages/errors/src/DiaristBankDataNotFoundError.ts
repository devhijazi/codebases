import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class DiaristBankDataNotFoundError extends ErrorBase {
  get message(): string {
    return 'Bank data not found.';
  }

  get code(): string {
    return 'DiaristBankDataNotFoundError';
  }

  get status(): number {
    return StatusCodes.NOT_FOUND;
  }
}
