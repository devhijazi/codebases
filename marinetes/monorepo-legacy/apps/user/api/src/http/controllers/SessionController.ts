import type { SessionLoginVerifyDocument } from '@marinetes/types/dtos/user/api';
import { Router } from 'express';

import { ControllerBase } from '@/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/http/middlewares/AuthenticationMiddleware';
import { SessionLoginValidation } from '@/http/validations/session/SessionLoginValidation';
import { SessionRefreshValidation } from '@/http/validations/session/SessionRefreshValidation';
import { SessionLoginService } from '@/infra/services/session/SessionLoginService';
import { SessionRefreshService } from '@/infra/services/session/SessionRefreshService';

export class SessionController extends ControllerBase {
  constructor() {
    super('sessions');
  }

  protected load(router: Router): void {
    const loginRouter = this.newRouter();

    router.use('/login', loginRouter);

    loginRouter.post(
      '/',
      SessionLoginValidation.make(),
      async ({ manager }, res) => {
        const sessionDriverLogin = new SessionLoginService();

        const sessionLoginDocument = await sessionDriverLogin.execute(
          manager.data,
        );

        res.json(sessionLoginDocument);
      },
    );

    loginRouter.post(
      '/refresh',
      SessionRefreshValidation.make(),
      async ({ manager }, res) => {
        const sessionRefresh = new SessionRefreshService();

        const sessionLoginRefreshDocument = await sessionRefresh.execute(
          manager.data,
        );

        res.json(sessionLoginRefreshDocument);
      },
    );

    loginRouter.get(
      '/verify',
      AuthenticationMiddleware.make(),
      async (_req, res) => {
        const data: SessionLoginVerifyDocument = {
          ok: true,
        };

        res.json(data);
      },
    );
  }
}
