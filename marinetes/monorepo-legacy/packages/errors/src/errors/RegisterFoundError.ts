import { ErrorBase } from '../common/ErrorBase';

export class RegisterFoundError extends ErrorBase {
  get code(): string {
    return 'RegisterFoundError';
  }

  get status(): number {
    return 400;
  }
}
