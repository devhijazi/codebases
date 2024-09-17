import { ErrorBase } from '../common/ErrorBase';

export class RegisterNotFoundError extends ErrorBase {
  get code(): string {
    return 'RegisterNotFoundError';
  }

  get status(): number {
    return 400;
  }
}
