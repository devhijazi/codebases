import type { AsaasClient } from '../Client';

import { AccountResource } from './accounts';
import { ChargeResource } from './charges';
import { CustomerResource } from './customer';
import { ExtractResource } from './extract';
import { FinancialInfoResource } from './financialInfo';
import { PixResource } from './pix';
import { SubAccountResource } from './subaccount';
import { TransfersResource } from './transfers';

export class Resources {
  extract: ExtractResource;

  pix: PixResource;

  financialInfo: FinancialInfoResource;

  accounts: AccountResource;

  charges: ChargeResource;

  customers: CustomerResource;

  subaccount: SubAccountResource;

  transfers: TransfersResource;

  constructor(client: AsaasClient) {
    this.accounts = new AccountResource(client);
    this.charges = new ChargeResource(client);
    this.customers = new CustomerResource(client);
    this.extract = new ExtractResource(client);
    this.financialInfo = new FinancialInfoResource(client);
    this.pix = new PixResource(client);
    this.subaccount = new SubAccountResource(client);
    this.transfers = new TransfersResource(client);
  }
}

export * from './accounts';
export * from './charges';
export * from './customer';
export * from './extract';
export * from './financialInfo';
export * from './pix';
export * from './subaccount';
export * from './transfers';
