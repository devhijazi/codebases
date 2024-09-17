import type { Diarist } from '../../../../model';
import type { PaginateReturnData } from '../../../mixin/pagination';
import type { ScheduleDocument } from './schedule';
import type { ServiceDocument } from './service';

export type DiaristScheduleListDocument = PaginateReturnData<ScheduleDocument>;

export type DiaristAcceptedServicesListDocument = {
  accepted_services: ServiceDocument[];
};

export type DiaristPasswordChangeValidationVerifyDocument = {
  valid: boolean;
};

export type DiaristInfoDocument = {
  accepting_services: boolean;
  all_schedules_count: number;
  schedules_this_month: number;
  schedules_pending_this_month: number;
};

export type DiaristDocument = Pick<
  Diarist,
  | 'id'
  | 'full_name'
  | 'birthdate'
  | 'document'
  | 'general_register'
  | 'phone'
  | 'email'
  | 'avatar'
>;
