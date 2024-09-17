import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { DiaristMiddleware } from '@/infra/http/middlewares/entities/DiaristMiddleware';
import { DiaristGetService } from '@/infra/http/services/diarist/DiaristGetService';

export class DiaristController extends ControllerBase {
  constructor() {
    super('diarists');
  }

  load(router: Router): void {
    router.get(
      '/:diaristId',
      DiaristMiddleware.make(),
      async ({ manager }, res) => {
        const diaristGet = new DiaristGetService();
        const diaristDocument = await diaristGet.execute(manager.diarist.id);

        res.json(diaristDocument);
      },
    );
  }
}
