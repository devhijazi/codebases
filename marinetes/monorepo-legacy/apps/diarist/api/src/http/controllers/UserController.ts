import { Router } from 'express';

import { UserMiddleware } from '@/http/middlewares/entities/UserMiddleware';
import { UserGetService } from '@/infra/services/user/UserGetService';
import { ControllerBase } from '@bases/ControllerBase';
import { AuthenticationMiddleware } from '@http/middlewares/AuthenticationMiddleware';

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
