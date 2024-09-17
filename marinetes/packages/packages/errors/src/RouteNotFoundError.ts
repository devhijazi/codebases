import { ErrorBase } from './ErrorBase';

export class RouteNotFoundError extends ErrorBase {
  get message(): string {
    return 'Route does not exists.';
  }

  get code(): string {
    return 'RouteNotFoundError';
  }

  get status(): number {
    return 404;
  }
}
