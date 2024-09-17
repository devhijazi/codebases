import type { PaginateData } from '@marinetes/types/dtos/mixin/pagination';
import type { Diarist, LeanModel } from '@marinetes/types/model';

type DiaristLean = LeanModel<Diarist>;

type PreRegisterFields =
  | 'full_name'
  | 'birthdate'
  | 'email'
  | 'document'
  | 'general_register'
  | 'phone';

type UpdateFields = 'phone';

// Create

export type DiaristCreateData = Pick<LeanModel<Diarist>, PreRegisterFields>;

// Send Email

export type DiaristReSendPreRegisterEmailData = {
  email: string;
};

// Update

export type DiaristUpdateData = Pick<DiaristLean, UpdateFields>;

// Accepting Services

export type DiaristChangeAcceptingServicesData = {
  accepting_services: boolean;
};

// Accepted Services

export type DiaristUpdateAcceptedServicesData = {
  accepted_services: string[];
};

// Schedule

export type DiaristScheduleListData = PaginateData;

// Password Change

export type DiaristFirstPasswordSetData = {
  token: string;
  password: string;
};

export type DiaristPasswordChangeData = {
  code: string;
  password: string;
};

export type DiaristPasswordChangeValidationVerifyData = {
  code: string;
};
