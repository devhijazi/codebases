import { ErrorBase } from '../common/ErrorBase';

export class PaginationError extends ErrorBase {
  get code(): string {
    return 'PaginationError';
  }

  get status(): number {
    return 400;
  }
}
