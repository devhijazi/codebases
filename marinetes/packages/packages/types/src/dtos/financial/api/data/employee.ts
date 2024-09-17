import type { Employee, LeanModel } from '../../../../model';

import { PaginateData } from '../../../mixin/pagination';

type EmployeeLean = LeanModel<Employee>;

export type EmployeeCreateData = Pick<EmployeeLean, 'full_name' | 'email'>;

export type EmployeeUpdateData = Pick<EmployeeLean, 'full_name' | 'password'>;

export type EmployeeListData = PaginateData;
