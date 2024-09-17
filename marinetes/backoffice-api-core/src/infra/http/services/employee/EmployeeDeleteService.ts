import { EmployeeRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';

export class EmployeeDeleteService implements Service {
  async execute(employeeId: string): Promise<void> {
    const employee = await EmployeeRepository.findOne(employeeId, {
      select: ['id', 'full_name', 'email'],
    });

    if (!employee) {
      throw new RegisterNotFoundError();
    }

    await EmployeeRepository.delete(employee.id);
  }
}
