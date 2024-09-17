import { Router } from 'express';

import { ControllerBase } from '@bases/ControllerBase';
import { AuthenticationMiddleware } from '@http/middlewares/AuthenticationMiddleware';
import { PaginationValidation } from '@http/validations/mixin/PaginationValidation';
import { EmployeeListService } from '@infra/services/employee/EmployeeListService';

export class EmployeeController extends ControllerBase {
  constructor() {
    super('employees', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.get('/', PaginationValidation.make(), async ({ manager }, res) => {
      const employeeList = new EmployeeListService();
      const employeeListDocument = await employeeList.execute(manager.data);

      res.json(employeeListDocument);
    });
  }
}
