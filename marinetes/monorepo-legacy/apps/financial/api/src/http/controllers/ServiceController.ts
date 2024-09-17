import { Router } from 'express';

import { ControllerBase } from '@/bases/ControllerBase';
import { AuthenticationMiddleware } from '@/http/middlewares/AuthenticationMiddleware';
import { ServiceMiddleware } from '@/http/middlewares/entities/ServiceMiddleware';
import { ServiceCreateValidation } from '@/http/validations/service/ServiceCreateValidation';
import { ServiceUpdateValidation } from '@/http/validations/service/ServiceUpdateValidation';
import { ServiceCreateService } from '@/infra/services/service/ServiceCreateService';
import { ServiceDeleteService } from '@/infra/services/service/ServiceDeleteService';
import { ServiceUpdateService } from '@/infra/services/service/ServiceUpdateService';

export class ServiceController extends ControllerBase {
  constructor() {
    super('services', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    const serviceGetRouter = this.newRouter();

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
