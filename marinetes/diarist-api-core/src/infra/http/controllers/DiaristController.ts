import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { DiaristCreateService } from '@/infra/http/services/diarist/DiaristCreateService';
import { DiaristFirstPasswordSetService } from '@/infra/http/services/diarist/DiaristFirstPasswordSetService';
import { DiaristCreateValidation } from '@/infra/http/validations/diarist/DiaristCreateValidation';
import { DiaristFirstPasswordSetValidation } from '@/infra/http/validations/diarist/DiaristFirstPasswordSetValidation';

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
