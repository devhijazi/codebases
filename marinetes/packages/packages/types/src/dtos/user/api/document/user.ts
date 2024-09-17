import type { User, UserAddress } from '../../../../model';

export type UserCreateValidationResultDocument = {
  valid: boolean;
};

export type UserAddressDocument = Pick<
  UserAddress,
  | 'id'
  | 'title'
  | 'type'
  | 'category'
  | 'rooms'
  | 'square_meters'
  | 'zip_code'
  | 'state'
  | 'city'
  | 'neighborhood'
  | 'street'
  | 'number'
  | 'complement'
>;

export type UserDocument = Pick<
  User,
  'id' | 'full_name' | 'document' | 'phone' | 'email'
>;
