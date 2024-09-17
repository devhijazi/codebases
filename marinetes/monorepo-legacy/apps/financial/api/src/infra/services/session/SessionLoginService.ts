import { EmployeeRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { PasswordHelper } from '@marinetes/password-helper';
import type {
  SessionLoginData,
  SessionLoginDocument,
} from '@marinetes/types/dtos/financial/api';

import { SessionTokenHelper } from '@infra/helpers/token/SessionTokenHelper';
import { EmployeeGetService } from '@infra/services/employee/EmployeeGetService';

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
