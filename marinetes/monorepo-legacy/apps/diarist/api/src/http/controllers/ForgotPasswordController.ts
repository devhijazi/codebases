import { Router } from 'express';

import { ControllerBase } from '@/bases/ControllerBase';
import { ForgotPasswordCreateValidation } from '@/http/validations/forgot-password/ForgotPasswordCreateValidation';
import { ForgotPasswordResetValidation } from '@/http/validations/forgot-password/ForgotPasswordResetValidation';
import { ForgotPasswordCreateService } from '@/infra/services/forgot-password/ForgotPasswordCreateService';
import { ForgotPasswordResetService } from '@/infra/services/forgot-password/ForgotPasswordResetService';

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
