import type { SessionLoginVerifyDocument } from '@marinetes/types/dtos/financial/api';
import { Router } from 'express';

import { ControllerBase } from '@/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/http/middlewares/AuthenticationMiddleware';
import { SessionLoginValidation } from '@/http/validations/session/SessionLoginValidation';
import { SessionLoginService } from '@/infra/services/session/SessionLoginService';

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
