import { ErrorBase } from './ErrorBase';

export class BudgetNotFoundError extends ErrorBase {
  get message(): string {
    return 'Budget does not exists.';
  }

  get code(): string {
    return 'BudgetNotFoundError';
  }

  get status(): number {
    return 400;
  }
}
