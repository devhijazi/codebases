import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { UserListService } from '@/infra/http/services/user/UserListService';
import { PaginationValidation } from '@/infra/http/validations/mixin/PaginationValidation';

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
