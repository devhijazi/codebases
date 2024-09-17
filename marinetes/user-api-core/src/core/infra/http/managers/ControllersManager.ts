import type { ControllerBase } from '@/core/infra/http/bases/ControllerBase';

import { Router } from 'express';

import { DiaristController } from '@/infra/http/controllers/DiaristController';
import { ForgotPasswordController } from '@/infra/http/controllers/ForgotPasswordController';
import { MeController } from '@/infra/http/controllers/MeController';
import { PaymentController } from '@/infra/http/controllers/PaymentController';
import { ServiceController } from '@/infra/http/controllers/ServiceController';
import { SessionController } from '@/infra/http/controllers/SessionController';
import { TransferController } from '@/infra/http/controllers/TransferController';
import { UserController } from '@/infra/http/controllers/UserController';

type ControllerInstance = {
  new (): ControllerBase;
};

const allControllers: ControllerInstance[] = [
  DiaristController,
  ForgotPasswordController,
  PaymentController,
  MeController,
  SessionController,
  UserController,
  TransferController,
  ServiceController,
];

export class ControllersManager {
  private readonly router = Router();

  public createRouter(): Router {
    const controllers = this.makeControllers();

    controllers.forEach(controller => {
      const { router, baseUrl } = controller.build();

      this.router.use(`/${baseUrl}`, router);
    });

    return this.router;
  }

  private makeControllers(): ControllerBase[] {
    return allControllers.map(Controller => new Controller());
  }
}
