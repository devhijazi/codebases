import type { SessionLoginVerifyDocument } from '@marinetesio/types/dtos/financial/api';

import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { SessionLoginService } from '@/infra/http/services/session/SessionLoginService';
import { SessionLoginValidation } from '@/infra/http/validations/session/SessionLoginValidation';

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
