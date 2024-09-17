import { PaginateReturnData } from '@marinetes/types/dtos/mixin/pagination';
import type { Employee } from '@marinetes/types/model';

export type EmployeeDocument = Pick<Employee, 'id' | 'full_name' | 'email'>;

export type EmployeeListDocument = PaginateReturnData<EmployeeDocument>;
