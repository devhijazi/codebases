import type { AsaasClient } from '../Client';

export interface AccountExtractRequestData {
  startDate?: string;
  finishDate?: string;
  offset?: string;
  limit?: number;
}

export interface AccountExtractResponse {
  object: string;
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: {
    object: string;
    id: string;
    value: string;
    balance: string;
    type: string;
    date: string;
    description: string;
    paymentId: string;
    transferId: string;
    anticipationId: string;
    billId: string;
    invoiceid: string;
    paymentDunningId: string;
    creditBureauReportId: string;
  }[];
}

export class ExtractResource {
  constructor(private readonly client: AsaasClient) {}

  get(params?: AccountExtractRequestData): Promise<AccountExtractResponse> {
    return this.client._request('financialTransactions', {
      params: params as Record<string, string>,
    });
  }
}
