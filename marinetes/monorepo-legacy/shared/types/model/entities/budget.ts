import type { Service } from './service';
import type { UserAddress } from './user';

export interface Budget {
  id: string;
  date: string;
  price: number;
  user_id: string;
  estimated_time_in_hours: number;
  address: UserAddress;
  services: Service[];
  created_timestamp: number;
}
