import type {
  Diarist,
  DiaristAddress,
  DiaristStatusType,
  LeanModel,
} from '../../../../model';
import type { PaginateData } from '../../../mixin/pagination';

type DiaristLean = LeanModel<Diarist>;

export type DiaristCreateData = Pick<
  DiaristLean,
  | 'full_name'
  | 'birthdate'
  | 'document'
  | 'general_register'
  | 'phone'
  | 'email'
> & {
  address: LeanModel<DiaristAddress>;
};

export type DiaristListData = PaginateData & {
  status?: DiaristStatusType;
  byDate?: boolean;
};

export type DiaristUpdateData = Pick<
  DiaristLean,
  'full_name' | 'birthdate' | 'document' | 'general_register' | 'phone'
>;

export type DiaristAddressUpdateData = LeanModel<DiaristAddress>;
