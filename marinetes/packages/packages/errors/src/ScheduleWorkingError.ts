import { ErrorBase } from './ErrorBase';

export class ScheduleWorkingError extends ErrorBase {
  get message(): string {
    return 'The diarist is working.';
  }

  get code(): string {
    return 'ScheduleWorkingError';
  }

  get status(): number {
    return 400;
  }
}
