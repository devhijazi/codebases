import { ErrorBase } from '../common/ErrorBase';

export class PasswordError extends ErrorBase {
  get code(): string {
    return 'PasswordError';
  }

  get status(): number {
    return 400;
  }
}
