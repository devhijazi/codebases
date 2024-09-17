import type { Employee } from '../../../../model';

import { PaginateReturnData } from '../../../mixin/pagination';

export type EmployeeDocument = Pick<Employee, 'id' | 'full_name' | 'email'>;

export type EmployeeListDocument = PaginateReturnData<EmployeeDocument>;
