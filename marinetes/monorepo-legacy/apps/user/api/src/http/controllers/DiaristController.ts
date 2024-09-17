import { Router } from 'express';

import { DiaristMiddleware } from '@/http/middlewares/entities/DiaristMiddleware';
import { DiaristGetService } from '@/infra/services/diarist/DiaristGetService';
import { ControllerBase } from '@bases/ControllerBase';

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
