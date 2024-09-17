import type { SessionLoginVerifyDocument } from '@marinetesio/types/dtos/diarist/api';

import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { SessionLoginService } from '@/infra/http/services/session/SessionLoginService';
import { SessionRefreshService } from '@/infra/http/services/session/SessionRefreshService';
import { SessionLoginValidation } from '@/infra/http/validations/session/SessionLoginValidation';
import { SessionRefreshValidation } from '@/infra/http/validations/session/SessionRefreshValidation';

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
