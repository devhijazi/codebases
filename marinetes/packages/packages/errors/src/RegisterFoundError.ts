import { ErrorBase } from './ErrorBase';

export class RegisterFoundError extends ErrorBase {
  get message(): string {
    return 'Register already exists.';
  }

  get code(): string {
    return 'RegisterFoundError';
  }

  get status(): number {
    return 400;
  }
}
