import { Router } from 'express';

import { PaginationValidation } from '@/http/validations/mixin/PaginationValidation';
import { UserListService } from '@/infra/services/user/UserListService';
import { ControllerBase } from '@bases/ControllerBase';
import { AuthenticationMiddleware } from '@http/middlewares/AuthenticationMiddleware';

export class UserController extends ControllerBase {
  constructor() {
    super('users', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.get('/', PaginationValidation.make(), async ({ manager }, res) => {
      const userList = new UserListService();
      const userListDocument = await userList.execute(manager.data);

      res.json(userListDocument);
    });
  }
}
