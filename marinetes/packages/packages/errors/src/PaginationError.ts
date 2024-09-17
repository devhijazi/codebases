import { ErrorBase } from './ErrorBase';

export class PaginationError extends ErrorBase {
  get message(): string {
    return 'Page does not exists.';
  }

  get code(): string {
    return 'PaginationError';
  }

  get status(): number {
    return 400;
  }
}
