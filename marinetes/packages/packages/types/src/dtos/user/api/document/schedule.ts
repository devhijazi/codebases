import type { CloneObject } from '../../../../all';
import type { Schedule } from '../../../../model';
import type { PaginateReturnData } from '../../../mixin/pagination';
import type { ServiceDocument } from './service';

export type ScheduleCreatedDocument = {
  id: string;
};

export type ScheduleListDocument = PaginateReturnData<ScheduleDocument>;

export type ScheduleDocument = CloneObject<
  Pick<
    Schedule,
    | 'id'
    | 'date'
    | 'end_date'
    | 'price'
    | 'user_id'
    | 'diarist_id'
    | 'second_diarist_id'
    | 'estimated_time_in_hours'
    | 'verification_code'
    | 'confirmation_code'
    | 'verified'
    | 'confirmed'
    | 'going_to_local'
    | 'status'
    | 'address'
    | 'payment'
    | 'created_at'
  > & {
    services: ServiceDocument[];
  }
>;
