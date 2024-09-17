import { Router } from 'express';

import { EmployeeGetService } from '@/infra/services/employee/EmployeeGetService';
import { ControllerBase } from '@bases/ControllerBase';
import { AuthenticationMiddleware } from '@http/middlewares/AuthenticationMiddleware';

export class MeController extends ControllerBase {
  constructor() {
    super('me', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.get('/', async ({ manager }, res) => {
      const employeeGet = new EmployeeGetService();
      const employeeDocument = await employeeGet.execute(
        manager.authenticated.id,
      );

      res.json(employeeDocument);
    });
  }
}
