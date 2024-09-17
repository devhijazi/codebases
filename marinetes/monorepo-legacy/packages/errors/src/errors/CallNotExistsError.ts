import { ErrorBase } from '../common/ErrorBase';

export class CallNotExistsError extends ErrorBase {
  get code(): string {
    return 'CallNotExistsError';
  }

  get status(): number {
    return 400;
  }
}
