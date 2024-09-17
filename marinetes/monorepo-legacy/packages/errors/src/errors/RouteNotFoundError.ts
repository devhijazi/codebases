import { ErrorBase } from '../common/ErrorBase';

export class RouteNotFoundError extends ErrorBase {
  get code(): string {
    return 'RouteNotFoundError';
  }

  get status(): number {
    return 404;
  }
}
