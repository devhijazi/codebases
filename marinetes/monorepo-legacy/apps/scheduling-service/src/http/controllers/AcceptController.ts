import { Router } from 'express';

import { DiaristAuthenticationMiddleware } from '@/http/middlewares/DiaristAuthenticationMiddleware';
import { AcceptValidation } from '@/http/validations/AcceptValidation';
import { AcceptService } from '@/infra/services/AcceptService';
import { ControllerBase } from '@bases/ControllerBase';

export class AcceptController extends ControllerBase {
  constructor() {
    super('accept', [DiaristAuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    router.post('/', AcceptValidation.make(), async ({ manager }, res) => {
      const accept = new AcceptService();

      await accept.execute(manager.authenticatedDiarist.id, manager.data);

      res.status(200).end();
    });
  }
}
