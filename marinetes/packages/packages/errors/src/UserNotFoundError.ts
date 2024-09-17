import { ErrorBase } from './ErrorBase';

export class UserNotFoundError extends ErrorBase {
  get message(): string {
    return 'User does not exists.';
  }

  get code(): string {
    return 'UserNotFoundError';
  }

  get status(): number {
    return 400;
  }
}
