import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class DiaristBankDataAlreadyExistsError extends ErrorBase {
  get message(): string {
    return 'Bank data already exists.';
  }

  get code(): string {
    return 'DiaristBankDataAlreadyExistsError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
