import { EmployeeRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import type { EmployeeDocument } from '@marinetes/types/dtos/financial/api';
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
