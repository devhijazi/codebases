import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class InsuficientFundsError extends ErrorBase {
  get message(): string {
    return 'The wallet does not have enough funds.';
  }

  get code(): string {
    return 'InsuficientFundsError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
