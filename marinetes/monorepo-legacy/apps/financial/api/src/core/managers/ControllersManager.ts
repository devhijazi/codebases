import { Router } from 'express';

import { DiaristController } from '@/http/controllers/DiaristController';
import { EmployeeController } from '@/http/controllers/EmployeeController';
import { MeController } from '@/http/controllers/MeController';
import { ScheduleController } from '@/http/controllers/ScheduleController';
import { ServiceController } from '@/http/controllers/ServiceController';
import { SessionController } from '@/http/controllers/SessionController';
import { UserController } from '@/http/controllers/UserController';
import type { ControllerBase } from '@bases/ControllerBase';

type ControllerInstance = {
  new (): ControllerBase;
};

const allControllers: ControllerInstance[] = [
  DiaristController,
  EmployeeController,
  MeController,
  ScheduleController,
  ServiceController,
  SessionController,
  UserController,
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
