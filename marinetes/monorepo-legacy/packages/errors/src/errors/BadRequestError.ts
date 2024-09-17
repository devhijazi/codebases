import { ErrorBase } from '../common/ErrorBase';

export class BadRequestError extends ErrorBase {
  get code(): string {
    return 'BadRequestError';
  }

  get status(): number {
    return 400;
  }
}
