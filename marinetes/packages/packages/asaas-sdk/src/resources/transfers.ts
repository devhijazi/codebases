import type { AsaasClient } from '../Client';

export type OperationType = 'PIX' | 'TED' | 'INTERNAL';

export interface TransferData {
  value: number;
  bankAccount?: {
    bank: {
      code: string;
    };
    accountName: string;
    ownerName: string;
    ownerBirthDate?: string;
    cpfCnpj: string;
    agency: string;
    account: string;
    accountDigit: string;
    bankAccountType: 'CONTA_CORRENTE' | 'CONTA_POUPANCA';
    ispb: string;
  };
  operationType?: OperationType;
  pixAddressKey?: string;
  pixAddressKeyType?: 'CPF' | 'CNPJ' | 'EMAIL' | 'PHONE' | 'EVP';
  description?: string;
  scheduleDate?: string;
}

export interface TransferResponse {
  object: 'transfer';
  id: string;
  type: 'BANK_ACCOUNT';
  dateCreated: string;
  value: number;
  netValue: number;
  status: string; // 'PENDING';
  transferFee: number;
  effectiveDate: string;
  endToEndIdentifier: string;
  scheduleDate: string;
  authorized: boolean;
  failReason: string;
  bankAccount: {
    bank: {
      ispb: string;
      code: string;
      name: string;
    };
    accountName: string;
    ownerName: string;
    cpfCnpj: string;
    agency: string;
    account: string;
    accountDigit: string;
    pixAddressKey: string;
  };
  transactionReceiptUrl: string;
  operationType: OperationType;
  description: string;
}

export class TransfersResource {
  constructor(private readonly client: AsaasClient) {}

  transfer(body: TransferData): Promise<TransferResponse> {
    return this.client._request('/transfers', {
      method: 'POST',
      body,
    });
  }

  getAll(): Promise<any> {
    return this.client._request('/transfers');
  }
}
