import type { EmployeeDocument } from '@marinetesio/types/dtos/financial/api';

import { EmployeeRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { instanceToPlain } from 'class-transformer';

export class EmployeeGetService implements Service {
  async execute(employeeId: string): Promise<EmployeeDocument> {
    const employee = await EmployeeRepository.findOne(employeeId, {
      select: ['id', 'full_name', 'email'],
    });

    if (!employee) {
      throw new RegisterNotFoundError();
    }

    return instanceToPlain(employee) as EmployeeDocument;
  }
}
