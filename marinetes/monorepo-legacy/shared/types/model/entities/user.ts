import type { ModelBase } from '../creation';

export interface User extends ModelBase {
  full_name: string;
  document: string;
  phone: string;
  email: string;
  password: string;
  avatar: string | null;
  addresses: UserAddress[];
}

export type UserAddressCategory = 0 | 1;

export type UserAddressType = 0 | 1 | 2;

export interface UserAddress extends ModelBase {
  title: string;
  type: UserAddressType;
  category: UserAddressCategory;
  rooms: number;
  square_meters: number;
  zip_code: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
}
