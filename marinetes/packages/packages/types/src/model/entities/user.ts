import type { ModelBase } from '../creation';

export interface UserWallet extends ModelBase {
  balance_available: number;
  blocked_balance: number;
}

export type UserTransferOperationType = 'pix';

export interface UserTransfer extends ModelBase {
  asaas_transfer_id: string;
  total_value: number;
  net_value: number;
  trasnsfer_fee: number | null;
  operation_type: UserTransferOperationType;
  status: string;
  bank_data_id: string | null;
  pix_data_id: string | null;
  user: User;
}

export type UserPixDataKeyType =
  | 'cpf'
  | 'cnpj'
  | 'phone'
  | 'email'
  | 'random_key';

export interface UserPixData extends ModelBase {
  key_type: UserPixDataKeyType;
  key: string;
  user: User;
}

export type UserPaymentMethod = 'pix';

export type UserPaymentStatus = string;

export interface UserPayment extends ModelBase {
  asaas_payment_id: string;
  method: UserPaymentMethod;
  total_value: number;
  net_value: number;
  status: UserPaymentStatus;
  pix_qr_code_base64: string;
  pix_copy_and_paste: string;
  user: User;
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
  number: string;
  complement: string | null;
}

export interface User extends ModelBase {
  full_name: string;
  document: string;
  phone: string;
  email: string;
  password: string;
  avatar: string | null;
  wallet: UserWallet | null;
  pixes: UserPixData[];
  transfers: UserTransfer[];
  payments: UserPayment[];
  addresses: UserAddress[];
}
