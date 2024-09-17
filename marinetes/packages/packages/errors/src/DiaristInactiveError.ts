import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class DiaristInactiveError extends ErrorBase {
  get message(): string {
    return 'Diarist inactive.';
  }

  get code(): string {
    return 'DiaristInactiveError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
