import { ErrorBase } from './ErrorBase';

export class ScheduleDonedError extends ErrorBase {
  get message(): string {
    return 'The schedule has been finalized.';
  }

  get code(): string {
    return 'ScheduleDonedError';
  }

  get status(): number {
    return 400;
  }
}
