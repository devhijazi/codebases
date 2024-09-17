import { ErrorBase } from './ErrorBase';

export class ForbiddenError extends ErrorBase {
  get message(): string {
    return 'Prohibited access.';
  }

  get code(): string {
    return 'ForbiddenError';
  }

  get status(): number {
    return 403;
  }
}
