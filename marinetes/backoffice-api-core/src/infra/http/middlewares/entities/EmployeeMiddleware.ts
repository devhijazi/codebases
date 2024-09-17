import { EmployeeRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { NextFunction, Request, Response } from 'express';

import {
  MiddlewareBase,
  buildMiddleware,
} from '@/core/infra/http/bases/MiddlewareBase';

class Middleware extends MiddlewareBase {
  async execute(
    { manager, params: { employeeId } }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const employee = await EmployeeRepository.findOne(employeeId, {
      select: ['id'],
    });

    if (!employee) {
      throw new RegisterNotFoundError();
    }

    manager.setEmployee(employee);
    next();
  }
}

export const EmployeeMiddleware = buildMiddleware(Middleware);
