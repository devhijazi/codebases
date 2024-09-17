import { Router } from 'express';

import { AllController } from '@/http/controllers/AllController';
import type { ControllerBase } from '@bases/ControllerBase';

type ControllerInstance = {
  new (): ControllerBase;
};

const allControllers: ControllerInstance[] = [AllController];

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
