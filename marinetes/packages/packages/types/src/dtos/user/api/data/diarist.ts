import type { Diarist, LeanModel } from '../../../../model';

type PreRegisterFields =
  | 'full_name'
  | 'birthdate'
  | 'email'
  | 'document'
  | 'general_register';

// Create

export type DiaristCreateData = Pick<LeanModel<Diarist>, PreRegisterFields>;
