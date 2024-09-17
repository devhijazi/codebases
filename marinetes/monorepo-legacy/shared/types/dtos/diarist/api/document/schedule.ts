import type { CloneObject } from '@marinetes/types/all';
import type { PaginateReturnData } from '@marinetes/types/dtos/mixin/pagination';
import type { Schedule } from '@marinetes/types/model';

import type { ServiceDocument } from './service';

export type ScheduleListDocument = PaginateReturnData<ScheduleDocument>;

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
