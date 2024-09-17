import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { EmployeeGetService } from '@/infra/http/services/employee/EmployeeGetService';

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
