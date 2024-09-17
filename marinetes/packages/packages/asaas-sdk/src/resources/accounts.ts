import type { AsaasClient } from '../Client';

export interface AccountCreateData {
  name: string;
  email: string;
  loginEmail?: string;
  cpfCnpj: string;
  birthDate?: string;
  companyType?: 'MEI' | 'LIMITED' | 'INDIVIDUAL' | 'ASSOCIATION';
  phone?: string;
  mobilePhone: string;
  site?: string;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
  postalCode: string;
  webhooks?: {
    type:
      | 'PAYMENT'
      | 'INVOICE'
      | 'TRANSFER'
      | 'BILL'
      | 'RECEIVABLE_ANTICIPATION'
      | 'MOBILE_PHONE_RECHARGE'
      | 'ACCOUNT_STATUS';
    url: string;
    email: string;
    apiVersion: '3';
    enabled: boolean;
    interrupted: boolean;
    authToken: string;
  }[];
}

export interface AccountCreateResponse {
  object: 'account';
  id: string;
  name: string;
  email: string;
  loginEmail: string;
  phone: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  postalCode: string;
  cpfCnpj: string;
  birthDate: string | null;
  personType: 'FISICA' | 'JURIDICA';
  companyType: 'MEI' | 'LIMITED' | 'INDIVIDUAL' | 'ASSOCIATION';
  city: number;
  state: string;
  country: string;
  tradingName: string | null;
  walletId: string;
  apiKey: string;
  accountNumber: {
    agency: string;
    account: string;
    accountDigit: string;
  };
}

export interface AccountGetResponse {
  object: 'account';
  id: string;
  name: string;
  email: string;
  loginEmail: string;
  phone: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  postalCode: string;
  cpfCnpj: string;
  birthDate: string | null;
  personType: 'FISICA' | 'JURIDICA';
  companyType: 'MEI' | 'LIMITED' | 'INDIVIDUAL' | 'ASSOCIATION';
  city: number;
  state: string;
  country: string;
  site: string;
  walletId: string;
}

export class AccountResource {
  constructor(private readonly client: AsaasClient) {}

  create(body: AccountCreateData): Promise<AccountCreateResponse> {
    return this.client._request('/accounts', {
      method: 'POST',
      body,
    });
  }

  get(accountId: string): Promise<AccountGetResponse> {
    return this.client._request(`/accounts`, {
      params: {
        id: accountId,
      },
    });
  }
}
