import { ErrorBase } from './ErrorBase';

export class ScheduleNotFoundError extends ErrorBase {
  get message(): string {
    return 'Schedule does not exists.';
  }

  get code(): string {
    return 'ScheduleNotFoundError';
  }

  get status(): number {
    return 400;
  }
}
