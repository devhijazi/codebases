import { ErrorBase } from '../common/ErrorBase';

export class APIError extends ErrorBase {
  get code(): string {
    return 'APIError';
  }

  get status(): number {
    return 500;
  }
}
