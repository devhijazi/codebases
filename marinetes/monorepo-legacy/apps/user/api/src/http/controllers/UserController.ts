import { Router } from 'express';

import { UserValidationCodeCreateValidation } from '@/http/validations/user/UserValidationCodeCreateValidation';
import { UserValidationCodeIsValidValidation } from '@/http/validations/user/UserValidationCodeIsValidValidation';
import { UserValidationCodeCreateService } from '@/infra/services/user/UserValidationCodeCreateService';
import { UserValidationCodeIsValidService } from '@/infra/services/user/UserValidationCodeIsValidService';
import { ControllerBase } from '@bases/ControllerBase';
import { UserCreateValidation } from '@http/validations/user/UserCreateValidation';
import { UserCreateService } from '@infra/services/user/UserCreateService';

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

    codeRouter.get(
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
