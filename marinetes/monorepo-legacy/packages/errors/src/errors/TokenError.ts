import { ErrorBase } from '../common/ErrorBase';

export class TokenError extends ErrorBase {
  get code(): string {
    return 'TokenError';
  }

  get status(): number {
    return 401;
  }
}
