import { ErrorBase } from '../common/ErrorBase';

export class AuthenticationError extends ErrorBase {
  get code(): string {
    return 'AuthenticationError';
  }

  get status(): number {
    return 401;
  }
}
