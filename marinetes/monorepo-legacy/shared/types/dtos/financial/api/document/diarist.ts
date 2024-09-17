import type { CloneObject } from '@marinetes/types/all';
import type { PaginateReturnData } from '@marinetes/types/dtos/mixin/pagination';
import type {
  Diarist,
  DiaristAddress,
  DiaristStatus,
  DiaristBankData,
} from '@marinetes/types/model';

export type DiaristStatusDocument = Pick<
  DiaristStatus,
  | 'type'
  | 'approved'
  | 'last_attend_email_sent_date'
  | 'disable_date'
  | 'disable_reason'
>;

export type DiaristBankDataDocument = Pick<
  DiaristBankData,
  'bank_number' | 'bank_name' | 'agency' | 'account'
>;

export type DiaristDocument = CloneObject<
  Pick<
    Diarist,
    | 'id'
    | 'full_name'
    | 'birthdate'
    | 'document'
    | 'general_register'
    | 'phone'
    | 'email'
    | 'avatar'
  > & {
    bank_data: DiaristBankDataDocument | null;
    address: DiaristAddressDocument | null;
    status: DiaristStatusDocument;
  }
>;

export type DiaristPartialDocument = CloneObject<
  Pick<Diarist, 'id' | 'full_name' | 'email' | 'document' | 'avatar'> & {
    status: DiaristStatusDocument;
  }
>;

export type DiaristCreateDocument = {
  id: string;
};

export type DiaristAddressDocument = Pick<
  DiaristAddress,
  'zip_code' | 'state' | 'city' | 'neighborhood' | 'street' | 'number'
>;

export type DiaristListDocument = PaginateReturnData<DiaristPartialDocument>;
