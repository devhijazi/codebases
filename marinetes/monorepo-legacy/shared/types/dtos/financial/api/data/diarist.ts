import type { PaginateData } from '@marinetes/types/dtos/mixin/pagination';
import type {
  Diarist,
  DiaristAddress,
  LeanModel,
} from '@marinetes/types/model';

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
  activeRegister?: boolean;
  preRegister?: boolean;
  byDate?: boolean;
};

export type DiaristUpdateData = Pick<
  DiaristLean,
  'full_name' | 'birthdate' | 'document' | 'general_register' | 'phone'
>;

export type DiaristAddressUpdateData = LeanModel<DiaristAddress>;
