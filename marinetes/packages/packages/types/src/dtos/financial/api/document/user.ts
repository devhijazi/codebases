import type { User } from '../../../../model';
import type { PaginateReturnData } from '../../../mixin/pagination';

export type UserDocument = Pick<
  User,
  'id' | 'full_name' | 'document' | 'phone' | 'email'
>;

export type UserListDocument = PaginateReturnData<UserDocument>;
