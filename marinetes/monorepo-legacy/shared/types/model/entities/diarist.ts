import type { ModelBase } from '../creation';
import type { Service } from './service';

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
  address: DiaristAddress | null;
  bank_data: DiaristBankData | null;
  status: DiaristStatus;
  accepted_services: Service[];
}

export interface DiaristBankData {
  id: string;
  bank_number: string;
  bank_name: string;
  agency: string;
  account: string;
  diarist_id: string;
}

export type DiaristStatusType = 'pending' | 'active' | 'inactive';

export interface DiaristStatus {
  id: string;
  type: DiaristStatusType;
  approved: boolean;
  last_attend_email_sent_date: string | null;
  disable_date: string | null;
  disable_reason: string | null;
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
