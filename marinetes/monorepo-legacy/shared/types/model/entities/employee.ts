import type { ModelBase } from '../creation';

export interface Employee extends ModelBase {
  full_name: string;
  email: string;
  password: string;
}
