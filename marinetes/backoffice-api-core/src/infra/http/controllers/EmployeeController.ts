import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { EmployeeCreateService } from '@/infra/http/services/employee/EmployeeCreateService';
import { EmployeeDeleteService } from '@/infra/http/services/employee/EmployeeDeleteService';
import { EmployeeGetService } from '@/infra/http/services/employee/EmployeeGetService';
import { EmployeeListService } from '@/infra/http/services/employee/EmployeeListService';
import { EmployeeUpdateService } from '@/infra/http/services/employee/EmployeeUpdateService';
import { PaginationValidation } from '@/infra/http/validations/mixin/PaginationValidation';

import { EmployeeMiddleware } from '../middlewares/entities/EmployeeMiddleware';
import { EmployeeCreateValidation } from '../validations/employee/EmployeeCreateValidation';
import { EmployeeUpdateValidation } from '../validations/employee/EmployeeUpdateValidation';

export class EmployeeController extends ControllerBase {
  constructor() {
    super('employees', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    const employeeGetRouter = this.newRouter();

    router.get('/', PaginationValidation.make(), async ({ manager }, res) => {
      const employeeList = new EmployeeListService();
      const employeeListDocument = await employeeList.execute(manager.data);

      res.json(employeeListDocument);
    });

    router.post(
      '/',
      EmployeeCreateValidation.make(),
      async ({ manager }, res) => {
        const employeeCreate = new EmployeeCreateService();
        await employeeCreate.execute(manager.data);

        res.status(201).end();
      },
    );

    router.use('/:employeeId', EmployeeMiddleware.make(), employeeGetRouter);

    employeeGetRouter.get('/', async ({ manager }, res) => {
      const employeeGet = new EmployeeGetService();
      const employeeGetDocument = await employeeGet.execute(
        manager.employee.id,
      );

      res.json(employeeGetDocument);
    });

    employeeGetRouter.patch(
      '/',
      EmployeeUpdateValidation.make(),
      async ({ manager }, res) => {
        const employeeUpdate = new EmployeeUpdateService();
        await employeeUpdate.execute(manager.employee.id, manager.data);

        res.status(200).end();
      },
    );

    employeeGetRouter.delete('/', async ({ manager }, res) => {
      const employeeDelete = new EmployeeDeleteService();
      await employeeDelete.execute(manager.employee.id);

      res.status(200).end();
    });
  }
}
