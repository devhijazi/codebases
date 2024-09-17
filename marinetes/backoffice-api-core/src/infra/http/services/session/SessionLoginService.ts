import type {
  SessionLoginData,
  SessionLoginDocument,
} from '@marinetesio/types/dtos/financial/api';

import { EmployeeRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { PasswordHelper } from '@marinetesio/password-helper';

import { EmployeeGetService } from '@/infra/http/services/employee/EmployeeGetService';
import { SessionTokenHelper } from '@/shared/helpers/token/SessionTokenHelper';

export class SessionLoginService implements Service {
  async execute({
    email,
    password,
  }: SessionLoginData): Promise<SessionLoginDocument> {
    const employee = await EmployeeRepository.findOne({
      select: ['id', 'email', 'password'],
      where: {
        email,
      },
    });

    if (!employee) {
      throw new RegisterNotFoundError();
    }

    await PasswordHelper.compare(password, employee.password);

    const employeeGet = new EmployeeGetService();
    const user = await employeeGet.execute(employee.id);

    const data: SessionLoginDocument = {
      token: SessionTokenHelper.create(employee.id),
      user,
    };

    return data;
  }
}
