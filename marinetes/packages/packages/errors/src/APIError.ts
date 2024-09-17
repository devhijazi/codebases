import { ErrorBase } from './ErrorBase';

export class APIError extends ErrorBase {
  get message(): string {
    return 'There was an unknown error in the API.';
  }

  get code(): string {
    return 'APIError';
  }

  get status(): number {
    return 500;
  }
}
