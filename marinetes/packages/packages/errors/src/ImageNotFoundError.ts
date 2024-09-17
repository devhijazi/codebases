import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class ImageNotFoundError extends ErrorBase {
  get message(): string {
    return 'Image does not exists.';
  }

  get code(): string {
    return 'ImageNotFoundError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
