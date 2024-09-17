import { Router } from 'express';

import { DiaristCreateValidation } from '@/http/validations/diarist/DiaristCreateValidation';
import { DiaristFirstPasswordSetValidation } from '@/http/validations/diarist/DiaristFirstPasswordSetValidation';
import { DiaristCreateService } from '@/infra/services/diarist/DiaristCreateService';
import { DiaristFirstPasswordSetService } from '@/infra/services/diarist/DiaristFirstPasswordSetService';
import { ControllerBase } from '@bases/ControllerBase';

export class DiaristController extends ControllerBase {
  constructor() {
    super('diarists');
  }

  load(router: Router): void {
    router.post(
      '/pre-register',
      DiaristCreateValidation.make(),
      async ({ manager }, res) => {
        const createDiarist = new DiaristCreateService();

        await createDiarist.execute(manager.data);

        res.status(200).end();
      },
    );

    router.post(
      '/set-first-password',
      DiaristFirstPasswordSetValidation.make(),
      async ({ manager }, res) => {
        const diaristFirstPasswordSet = new DiaristFirstPasswordSetService();

        await diaristFirstPasswordSet.execute(manager.data);

        res.status(200).end();
      },
    );
  }
}
