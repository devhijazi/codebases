import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { UserMiddleware } from '@/infra/http/middlewares/entities/UserMiddleware';
import { UserGetService } from '@/infra/http/services/user/UserGetService';

export class UserController extends ControllerBase {
  constructor() {
    super('users', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.get('/:userId', UserMiddleware.make(), async ({ manager }, res) => {
      const userGet = new UserGetService();

      const userDocument = await userGet.execute(manager.user.id);

      res.json(userDocument);
    });
  }
}
