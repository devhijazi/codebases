import { StatusCodes } from 'http-status-codes';

import { ErrorBase } from './ErrorBase';

export class ImageTypeNotAllowedError extends ErrorBase {
  get message(): string {
    return 'Unsupported image type.';
  }

  get code(): string {
    return 'ImageTypeNotAllowedError';
  }

  get status(): number {
    return StatusCodes.BAD_REQUEST;
  }
}
