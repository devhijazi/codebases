import type { EmployeeCreateData } from '@marinetesio/types/dtos/financial/api';

import { EmployeeRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterFoundError } from '@marinetesio/errors';

export class EmployeeCreateService implements Service {
  async execute(data: EmployeeCreateData): Promise<void> {
    const { email } = data;

    const hasEmployee = await EmployeeRepository.createQueryBuilder('employee')
      .orWhere({ email })
      .select(['employee.id', 'employee.email', 'employee.full_name'])
      .getOne();

    if (hasEmployee) {
      throw new RegisterFoundError();
    }

    await EmployeeRepository.create(data).save();
  }
}
