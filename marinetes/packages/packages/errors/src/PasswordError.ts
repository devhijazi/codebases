import { ErrorBase } from './ErrorBase';

export class PasswordError extends ErrorBase {
  get message(): string {
    return 'Invalid e-mail/password combination.';
  }

  get code(): string {
    return 'PasswordError';
  }

  get status(): number {
    return 400;
  }
}
