import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { UserCreateService } from '@/infra/http/services/user/UserCreateService';
import { UserValidationCodeCreateService } from '@/infra/http/services/user/UserValidationCodeCreateService';
import { UserValidationCodeIsValidService } from '@/infra/http/services/user/UserValidationCodeIsValidService';
import { UserCreateValidation } from '@/infra/http/validations/user/UserCreateValidation';
import { UserValidationCodeCreateValidation } from '@/infra/http/validations/user/UserValidationCodeCreateValidation';
import { UserValidationCodeIsValidValidation } from '@/infra/http/validations/user/UserValidationCodeIsValidValidation';

export class UserController extends ControllerBase {
  constructor() {
    super('users');
  }

  load(router: Router): void {
    const registerRouter = this.newRouter();
    const codeRouter = this.newRouter();

    router.use('/register', registerRouter);

    registerRouter.post(
      '/',
      UserCreateValidation.make(),
      async ({ manager }, res) => {
        const createUser = new UserCreateService();

        await createUser.execute(manager.data);

        res.status(200).end();
      },
    );

    registerRouter.use('/code', codeRouter);

    codeRouter.post(
      '/new',
      UserValidationCodeCreateValidation.make(),
      async ({ manager }, res) => {
        const userValidationCodeCreate = new UserValidationCodeCreateService();

        await userValidationCodeCreate.execute(manager.data);

        res.status(200).end();
      },
    );

    codeRouter.post(
      '/verify',
      UserValidationCodeIsValidValidation.make(),
      async ({ manager }, res) => {
        const userValidationCodeIsValid =
          new UserValidationCodeIsValidService();
        const userCreateValidationResultDocument =
          await userValidationCodeIsValid.execute(manager.data);

        res.json(userCreateValidationResultDocument);
      },
    );
  }
}
