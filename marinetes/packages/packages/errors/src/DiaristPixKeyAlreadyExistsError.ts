import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class DiaristPixKeyAlreadyExistsError extends ErrorBase {
  get message(): string {
    return 'Pix key already exists.';
  }

  get code(): string {
    return 'DiaristPixKeyAlreadyExistsError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
