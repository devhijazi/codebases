import type { CloneObject } from '../../../../all';
import type { Schedule } from '../../../../model';
import type { PaginateReturnData } from '../../../mixin/pagination';
import type { ServiceDocument } from './service';

export type ScheduleDocument = CloneObject<
  Pick<
    Schedule,
    | 'id'
    | 'status'
    | 'date'
    | 'end_date'
    | 'price'
    | 'estimated_time_in_hours'
    | 'verified'
    | 'confirmed'
    | 'going_to_local'
    | 'user_id'
    | 'diarist_id'
    | 'second_diarist_id'
    | 'address'
    | 'created_at'
  > & {
    services: ServiceDocument[];
  }
>;

export type ScheduleListDocument = PaginateReturnData<ScheduleDocument>;
