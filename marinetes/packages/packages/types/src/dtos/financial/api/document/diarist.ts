import type { CloneObject } from '../../../../all';
import type { Diarist, DiaristAddress, DiaristStatus } from '../../../../model';
import type { PaginateReturnData } from '../../../mixin/pagination';

export type DiaristStatusDocument = Pick<
  DiaristStatus,
  | 'type'
  | 'approved'
  | 'last_attend_email_sent_date'
  | 'disable_date'
  | 'disable_reason'
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
    status: DiaristStatusDocument;
    address: DiaristAddressDocument | null;
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
