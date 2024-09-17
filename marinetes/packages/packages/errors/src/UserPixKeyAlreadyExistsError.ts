import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class UserPixKeyAlreadyExistsError extends ErrorBase {
  get message(): string {
    return 'Pix key already exists.';
  }

  get code(): string {
    return 'UserPixKeyAlreadyExistsError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
