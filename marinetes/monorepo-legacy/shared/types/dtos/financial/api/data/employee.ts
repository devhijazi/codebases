import { PaginateData } from '@marinetes/types/dtos/mixin/pagination';
import type { Employee, LeanModel } from '@marinetes/types/model';

type EmployeeLean = LeanModel<Employee>;

// Create

export type EmployeeCreateData = Pick<EmployeeLean, 'full_name' | 'email'>;

// List

export type EmployeeListData = PaginateData;
