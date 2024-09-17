import type { PaginateReturnData } from '@marinetes/types/dtos/mixin/pagination';
import type { User } from '@marinetes/types/model';

export type UserDocument = Pick<
  User,
  'id' | 'full_name' | 'document' | 'phone' | 'email'
>;

export type UserListDocument = PaginateReturnData<UserDocument>;
