import { ErrorBase } from './ErrorBase';

export class ScheduleCanceledError extends ErrorBase {
  get message(): string {
    return 'The schedule has been canceled.';
  }

  get code(): string {
    return 'ScheduleCanceledError';
  }

  get status(): number {
    return 400;
  }
}
