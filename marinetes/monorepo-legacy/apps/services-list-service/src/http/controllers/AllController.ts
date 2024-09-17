import { Router } from 'express';

import { AllServicesListService } from '@/infra/services/AllServicesListService';
import { ControllerBase } from '@bases/ControllerBase';

export class AllController extends ControllerBase {
  constructor() {
    super('all');
  }

  load(router: Router): void {
    router.get('/', async (_req, res) => {
      const allServicesList = new AllServicesListService();
      const allServicesDocument = await allServicesList.execute();

      res.json(allServicesDocument);
    });
  }
}
