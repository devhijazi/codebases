import type { AsaasClient } from '../Client';

export interface FinancialTransactionsResponse {
  balance: number;
}

export class FinancialInfoResource {
  constructor(private readonly client: AsaasClient) {}

  balance(): Promise<FinancialTransactionsResponse> {
    return this.client._request('/finance/balance');
  }
}
