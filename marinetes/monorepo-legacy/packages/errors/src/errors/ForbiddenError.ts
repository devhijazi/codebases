import { ErrorBase } from '../common/ErrorBase';

export class ForbiddenError extends ErrorBase {
  get code(): string {
    return 'ForbiddenError';
  }

  get status(): number {
    return 403;
  }
}
