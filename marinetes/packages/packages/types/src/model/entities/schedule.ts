import type { ModelBase } from '../creation';
import type { Service } from './service';
import type { UserAddress } from './user';

export type ScheduleStatus = 'canceled' | 'pending' | 'working' | 'done';

export type SchedulePayment = Record<string, any>;

export interface Schedule extends ModelBase {
  status: ScheduleStatus;
  date: string;
  end_date: string | null;
  price: number;
  estimated_time_in_hours: number;
  verified: boolean;
  confirmed: boolean;
  going_to_local: boolean;
  user_id: string;
  diarist_id: string;
  second_diarist_id: string | null;
  verification_code: string;
  confirmation_code: string;
  address: UserAddress;
  payment: SchedulePayment;
  services: Service[];
}
