import type { AsaasClient } from '../Client';

import { AsaasObjectList } from '../@types/asaas';

export type PixTransactionStatus =
  | 'AWAITING_REQUEST'
  | 'DONE'
  | 'REQUESTED'
  | 'SCHEDULED'
  | 'REFUSED'
  | 'ERROR'
  | 'CANCELLED';

export type PixTransactionType =
  | 'DEBIT'
  | 'CREDIT'
  | 'CREDIT_REFUND'
  | 'DEBIT_REFUND'
  | 'DEBID_REFUND_CANCELLATION';

export type PixAddressType = 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'EVP';

export interface RetrievePixTransactionsRequest {
  status?: PixTransactionStatus;
  type?: PixTransactionType;
  endToEndIdentifier?: string;
  offset?: number;
  limit?: number;
}

export interface PixTransaction {
  id: string;
  endToEndIdentifier: string;
  finality: null;
  value: number;
  changeValue: string | null;
  refundedValue: number;
  effectiveDate: string;
  scheduledDate: string | null;
  status: 'PENDING' | 'DONE';
  type: 'CREDIT';
  originType: 'STATIC_QRCODE';
  conciliationIdentifier: string;
  description: string | null;
  transactionReceiptUrl: string;
  refusalReason: string | null;
  canBeCanceled: boolean;
  originalTransaction: string | null;
  externalAccount: {
    ispb: number;
    ispbName: string;
    name: string;
    cpfCnpj: string;
    addressKey: string;
    addressKeyType: PixAddressType;
  };
  qrCode: string | null;
  payment: string;
}

export interface PixTransactionsResponse
  extends AsaasObjectList<PixTransaction> {}

export class PixResource {
  constructor(private readonly client: AsaasClient) {}

  retrievePixTransactions(
    params?: RetrievePixTransactionsRequest,
  ): Promise<PixTransactionsResponse> {
    return this.client._request('/pix/transactions', {
      params: params as Record<string, string>,
    });
  }
}
