import type { ModelBase } from '../creation';
import type { Service } from './service';

export type DiaristStatusType = 'pending' | 'active' | 'inactive';

export interface DiaristStatus {
  id: string;
  type: DiaristStatusType;
  approved: boolean;
  last_attend_email_sent_date: string | null;
  disable_date: string | null;
  disable_reason: string | null;
}

export type DiaristTransferOperationType = 'pix';

export interface DiaristTransfer extends ModelBase {
  asaas_transfer_id: string;
  total_value: number;
  net_value: number;
  trasnsfer_fee: number | null;
  operation_type: DiaristTransferOperationType;
  status: string;
  bank_data_id: string | null;
  pix_data_id: string | null;
  diarist: Diarist;
}

export interface DiaristAddress extends ModelBase {
  zip_code: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
}

export interface DiaristFile extends ModelBase {
  description: string;
  type: string;
  extension: string;
  size_in_mb: number;
  url: string;
  diarist_id: string;
}

export interface DiaristWallet extends ModelBase {
  balance: number;
}

export type DiaristBankDataAccountType = 'checking_account' | 'savings_account';

export interface DiaristBankData extends ModelBase {
  account_name: string;
  owner_name: string;
  document: string;
  agency: string;
  account: string;
  account_digit: string;
  bank_code: string | null;
  ispb: string | null;
  bank_account_type: DiaristBankDataAccountType;
  diarist: Diarist;
}

export type DiaristPixDataKeyType =
  | 'cpf'
  | 'cnpj'
  | 'phone'
  | 'email'
  | 'random_key';

export interface DiaristPixData extends ModelBase {
  key_type: DiaristPixDataKeyType;
  key: string;
  diarist: Diarist;
}

export interface Diarist extends ModelBase {
  full_name: string;
  birthdate: string;
  document: string;
  general_register: string;
  phone: string;
  email: string;
  accepting_services: boolean;
  avatar: string | null;
  password: string;
  status: DiaristStatus;
  address: DiaristAddress | null;
  wallet: DiaristWallet | null;
  pixes: DiaristPixData[];
  banks: DiaristBankData[];
  transfers: DiaristTransfer[];
  accepted_services: Service[];
}
