import { ErrorBase } from './ErrorBase';

export class RegisterNotFoundError extends ErrorBase {
  get message(): string {
    return 'Register does not exists.';
  }

  get code(): string {
    return 'RegisterNotFoundError';
  }

  get status(): number {
    return 400;
  }
}
