import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { ServiceMiddleware } from '@/infra/http/middlewares/entities/ServiceMiddleware';
import { AllServicesListService } from '@/infra/http/services/service/AllServiceListService';
import { ServiceCreateService } from '@/infra/http/services/service/ServiceCreateService';
import { ServiceDeleteService } from '@/infra/http/services/service/ServiceDeleteService';
import { ServiceUpdateService } from '@/infra/http/services/service/ServiceUpdateService';
import { ServiceCreateValidation } from '@/infra/http/validations/service/ServiceCreateValidation';
import { ServiceUpdateValidation } from '@/infra/http/validations/service/ServiceUpdateValidation';

export class ServiceController extends ControllerBase {
  constructor() {
    super('services', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    const serviceGetRouter = this.newRouter();

    router.get('/', async (_req, res) => {
      const allServicesList = new AllServicesListService();
      const allServicesDocument = await allServicesList.execute();

      res.json(allServicesDocument);
    });

    router.post(
      '/',
      ServiceCreateValidation.make(),
      async ({ manager }, res) => {
        const createService = new ServiceCreateService();
        const serviceDocument = await createService.execute(manager.data);

        res.json(serviceDocument);
      },
    );

    router.use('/:serviceId', ServiceMiddleware.make(), serviceGetRouter);

    serviceGetRouter.delete('/', async ({ manager: { service } }, res) => {
      const deleteService = new ServiceDeleteService();

      await deleteService.execute(service.id);

      res.status(200).end();
    });

    serviceGetRouter.put(
      '/',
      ServiceUpdateValidation.make(),
      async ({ manager }, res) => {
        const serviceUpdateIcon = new ServiceUpdateService();

        await serviceUpdateIcon.execute(manager.service.id, manager.data);

        res.status(200).end();
      },
    );
  }
}
