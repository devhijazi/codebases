import type { NotRequiredObject } from '../../../../all';
import type { User, UserAddress, LeanModel } from '../../../../model';

import { PaginateData } from '../../../mixin/pagination';

type UserLean = Omit<LeanModel<User>, NotCreateOrUpdateFields>;

type NotCreateOrUpdateFields = 'reset_password_token' | 'addresses' | 'avatar';

type NotUpdateFields = 'document' | 'password' | 'email';

// Create

export type UserCreateData = {
  code: string;
  data: UserLean;
};

// Update

export type UserUpdateData = Omit<
  NotRequiredObject<UserLean>,
  NotCreateOrUpdateFields | NotUpdateFields
>;

// Address

export type UserAddressCreateData = LeanModel<UserAddress>;

export type UserAddressUpdateData = Pick<
  UserAddress,
  'title' | 'category' | 'type' | 'rooms' | 'square_meters'
>;

// Schedule

export type UserScheduleListData = PaginateData;

// Validation

export type UserValidationCodeCreateData = {
  email: string;
};

export type UserValidationCodeIsValidData = {
  code: string;
  email: string;
};
