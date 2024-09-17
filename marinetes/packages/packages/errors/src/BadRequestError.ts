import { ErrorBase } from './ErrorBase';

export class BadRequestError extends ErrorBase {
  get message(): string {
    return 'Bad request.';
  }

  get code(): string {
    return 'BadRequestError';
  }

  get status(): number {
    return 400;
  }
}
