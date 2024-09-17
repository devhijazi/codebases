import { ErrorBase } from './ErrorBase';

export class TokenError extends ErrorBase {
  get message(): string {
    return 'The JWT token is invalid.';
  }

  get code(): string {
    return 'TokenError';
  }

  get status(): number {
    return 401;
  }
}
