import { ErrorBase } from './ErrorBase';

export class AuthenticationError extends ErrorBase {
  get message(): string {
    return 'Authentication error.';
  }

  get code(): string {
    return 'AuthenticationError';
  }

  get status(): number {
    return 401;
  }
}
