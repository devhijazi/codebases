import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';

import { ServicesListService } from '../services/services/ServicesListService';

export class ServiceController extends ControllerBase {
  constructor() {
    super('services');
  }

  protected load(router: Router): void {
    router.get('/', async (_req, res) => {
      const servicesList = new ServicesListService();
      const services = await servicesList.execute();

      res.json(services);
    });
  }
}
