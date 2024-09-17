import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { ForgotPasswordCreateService } from '@/infra/http/services/forgot-password/ForgotPasswordCreateService';
import { ForgotPasswordResetService } from '@/infra/http/services/forgot-password/ForgotPasswordResetService';
import { ForgotPasswordCreateValidation } from '@/infra/http/validations/forgot-password/ForgotPasswordCreateValidation';
import { ForgotPasswordResetValidation } from '@/infra/http/validations/forgot-password/ForgotPasswordResetValidation';

export class ForgotPasswordController extends ControllerBase {
  constructor() {
    super('forgot-password');
  }

  protected load(router: Router): void {
    router.post(
      '/reset',
      ForgotPasswordResetValidation.make(),
      async ({ manager: { data } }, res) => {
        const forgotPasswordReset = new ForgotPasswordResetService();

        await forgotPasswordReset.execute(data);

        res.status(200).end();
      },
    );

    router.post(
      '/create',
      ForgotPasswordCreateValidation.make(),
      async ({ manager: { data } }, res) => {
        const forgotPasswordCreate = new ForgotPasswordCreateService();

        await forgotPasswordCreate.execute(data);

        res.status(200).end();
      },
    );
  }
}
