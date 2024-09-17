import type { AsaasClient } from '../Client';

export interface Customer {
  object: 'customer';
  id: string;
  dateCreated: string;
  name: string;
  email: string;
  phone: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  complement: string;
  province: string;
  postalCode: string;
  cpfCnpj: string;
  personType: 'FISICA' | 'JURIDICA';
  deleted: boolean;
  additionalEmails: string;
  externalReference: string;
  notificationDisabled: boolean;
  city: number;
  state: string;
  country: string;
  observations: string;
}

export interface CustomerCreateData {
  name: string;
  cpfCnpj: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  province?: string;
  postalCode?: string;
  externalReference?: string;
  notificationDisabled?: boolean;
  additionalEmails?: string;
  municipalInscription?: string;
  stateInscription?: string;
  observations?: string;
  groupName?: string;
  company?: string;
}

export interface CustomerListData {
  name?: string;
  email?: string;
  cpfCnpj?: string;
  groupName?: string;
  externalReference?: string;
  offset?: number;
  limit?: number;
}

export interface CustomerListResponseData {
  object: string;
  hasMore: boolean;
  totalCount: number;
  limit: number;
  offset: number;
  data: Customer[];
}

export class CustomerResource {
  constructor(private readonly client: AsaasClient) {}

  create(body: CustomerCreateData): Promise<Customer> {
    return this.client._request('customers', {
      method: 'POST',
      body,
    });
  }

  get(customerId: string): Promise<Customer> {
    return this.client._request(`customers/${customerId}`);
  }

  list(data?: CustomerListData): Promise<CustomerListResponseData> {
    return this.client._request('customers', {
      params: data as Record<string, string>,
    });
  }
}
