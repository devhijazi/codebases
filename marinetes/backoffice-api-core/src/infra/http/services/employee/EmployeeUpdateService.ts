import type { EmployeeUpdateData } from '@marinetesio/types/dtos/financial/api';

import { EmployeeRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

export class EmployeeUpdateService implements Service {
  async execute(employeeId: string, data: EmployeeUpdateData): Promise<void> {
    const { full_name } = data;
    const employee = await EmployeeRepository.findOne(employeeId, {
      select: ['id', 'full_name', 'email'],
    });

    if (!employee) {
      throw new RegisterNotFoundError();
    }

    await EmployeeRepository.update(employee.id, {
      full_name,
    });
  }
}
