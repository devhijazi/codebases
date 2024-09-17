import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { CreateDiaristPixDataService } from '@/infra/grpc/payment/services/diarists/pixes/CreateDiaristPixDataService';
import { DeleteDiaristPixDataService } from '@/infra/grpc/payment/services/diarists/pixes/DeleteDiaristPixDataService';
import { GetAllDiaristPixDataService } from '@/infra/grpc/payment/services/diarists/pixes/GetAllDiaristPixDataService';
import { GetDiaristPixDataService } from '@/infra/grpc/payment/services/diarists/pixes/GetDiaristPixDataService';
import { UpdateDiaristPixDataService } from '@/infra/grpc/payment/services/diarists/pixes/UpdateDiaristPixDataService';
import { GetDiaristWalletService } from '@/infra/grpc/payment/services/wallets/GetDiaristWalletService';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { DiaristAcceptedServicesListService } from '@/infra/http/services/diarist/DiaristAcceptedServicesListService';
import { DiaristChangeAcceptingServicesService } from '@/infra/http/services/diarist/DiaristChangeAcceptingServicesService';
import { DiaristGetService } from '@/infra/http/services/diarist/DiaristGetService';
import { DiaristInfoService } from '@/infra/http/services/diarist/DiaristInfoService';
import { DiaristPasswordChangeService } from '@/infra/http/services/diarist/DiaristPasswordChangeService';
import { DiaristPasswordChangeValidationCreateService } from '@/infra/http/services/diarist/DiaristPasswordChangeValidationCreateService';
import { DiaristPasswordChangeValidationVerifyService } from '@/infra/http/services/diarist/DiaristPasswordChangeValidationVerifyService';
import { DiaristScheduleListService } from '@/infra/http/services/diarist/DiaristScheduleListService';
import { DiaristUpdateAcceptedServicesService } from '@/infra/http/services/diarist/DiaristUpdateAcceptedServicesService';
import { DiaristChangeAcceptingServicesValidation } from '@/infra/http/validations/diarist/DiaristChangeAcceptingServicesValidation';
import { DiaristPasswordChangeValidation } from '@/infra/http/validations/diarist/DiaristPasswordChangeValidation';
import { DiaristPasswordChangeValidationVerifyValidation } from '@/infra/http/validations/diarist/DiaristPasswordChangeValidationVerifyValidation';
import { DiaristUpdateAcceptedServicesValidation } from '@/infra/http/validations/diarist/DiaristUpdateAcceptedServicesValidation';
import { PaginationValidation } from '@/infra/http/validations/mixin/PaginationValidation';

import { DiaristScheduleAllListService } from '../services/diarist/DiaristScheduleAllListService';
import { CreateDiaristPixDataValidation } from '../validations/diarist/CreateDiaristPixDataVlidation';
import { UpdateDiaristPixDataValidation } from '../validations/diarist/UpdateDiaristPixDataVlidation';

export class MeController extends ControllerBase {
  constructor() {
    super('me', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    const pixesRouter = this.newRouter();
    const changePasswordRouter = this.newRouter();
    const changePasswordCodeRouter = this.newRouter();

    router.get('/', async ({ manager }, res) => {
      const diaristGet = new DiaristGetService();

      const diaristDocument = await diaristGet.execute(
        manager.authenticated.id,
      );

      res.json(diaristDocument);
    });

    router.get('/info', async ({ manager }, res) => {
      const diaristInfo = new DiaristInfoService();

      const diaristInfoDocument = await diaristInfo.execute(
        manager.authenticated.id,
      );

      res.json(diaristInfoDocument);
    });

    router.put(
      '/accepting-services',
      DiaristChangeAcceptingServicesValidation.make(),
      async ({ manager }, res) => {
        const diaristChangeAcceptingServices =
          new DiaristChangeAcceptingServicesService();

        await diaristChangeAcceptingServices.execute(
          manager.authenticated.id,
          manager.data,
        );

        res.status(200).end();
      },
    );

    router.put(
      '/accepted-services',
      DiaristUpdateAcceptedServicesValidation.make(),
      async ({ manager }, res) => {
        const diaristUpdateAcceptedServices =
          new DiaristUpdateAcceptedServicesService();

        await diaristUpdateAcceptedServices.execute(
          manager.authenticated.id,
          manager.data,
        );

        res.status(200).end();
      },
    );

    router.get('/accepted-services', async ({ manager }, res) => {
      const diaristAcceptedServicesList =
        new DiaristAcceptedServicesListService();

      const diaristAcceptedServicesListDocument =
        await diaristAcceptedServicesList.execute(manager.authenticated.id);

      res.json(diaristAcceptedServicesListDocument);
    });

    router.get(
      '/schedules',
      PaginationValidation.make(),
      async ({ manager }, res) => {
        const diaristScheduleList = new DiaristScheduleListService();

        const diaristSchedulesListDocument = await diaristScheduleList.execute(
          manager.authenticated.id,
          manager.data,
        );

        res.json(diaristSchedulesListDocument);
      },
    );

    router.get('/schedules/all', async ({ manager }, res) => {
      const diaristScheduleAllList = new DiaristScheduleAllListService();

      const schedules = await diaristScheduleAllList.execute(
        manager.authenticated.id,
      );

      res.json(schedules);
    });

    router.get('/wallet', async ({ manager }, res) => {
      const getDiaristWallet = new GetDiaristWalletService();

      const wallet = await getDiaristWallet.execute({
        diaristId: manager.authenticated.id,
      });

      res.json(wallet);
    });

    router.use('/pixes', pixesRouter);

    pixesRouter.post(
      '/',
      CreateDiaristPixDataValidation.make(),
      async ({ manager }, res) => {
        const createDiaristPixData = new CreateDiaristPixDataService();

        await createDiaristPixData.execute({
          diaristId: manager.authenticated.id,
          ...manager.data,
        });

        res.status(201).end();
      },
    );

    pixesRouter.get('/', async ({ manager }, res) => {
      const getAllDiaristPixData = new GetAllDiaristPixDataService();

      const pixes = await getAllDiaristPixData.execute({
        diaristId: manager.authenticated.id,
      });

      res.json(pixes);
    });

    pixesRouter.get('/:pixDataId', async ({ params }, res) => {
      const getDiaristPixData = new GetDiaristPixDataService();

      const pixData = await getDiaristPixData.execute({
        pixDataId: params.pixDataId,
      });

      res.json(pixData);
    });

    pixesRouter.patch(
      '/:pixDataId',
      UpdateDiaristPixDataValidation.make(),
      async ({ params, manager }, res) => {
        const updateDiaristPixData = new UpdateDiaristPixDataService();

        await updateDiaristPixData.execute({
          pixDataId: params.pixDataId,
          ...manager.data,
        });

        res.status(204).end();
      },
    );

    pixesRouter.delete('/:pixDataId', async ({ params }, res) => {
      const deleteDiaristPixData = new DeleteDiaristPixDataService();

      await deleteDiaristPixData.execute({
        pixDataId: params.pixDataId,
      });

      res.status(204).end();
    });

    router.use('/change-password', changePasswordRouter);

    changePasswordRouter.post(
      '/',
      DiaristPasswordChangeValidation.make(),
      async ({ manager }, res) => {
        const diaristPasswordChange = new DiaristPasswordChangeService();

        await diaristPasswordChange.execute(
          manager.authenticated.id,
          manager.data,
        );

        res.status(200).end();
      },
    );

    changePasswordRouter.use('/code', changePasswordCodeRouter);

    changePasswordCodeRouter.post('/new', async ({ manager }, res) => {
      const diaristPasswordChangeValidationCreate =
        new DiaristPasswordChangeValidationCreateService();

      await diaristPasswordChangeValidationCreate.execute(
        manager.authenticated.id,
      );

      res.status(200).end();
    });

    changePasswordCodeRouter.get(
      '/verify',
      DiaristPasswordChangeValidationVerifyValidation.make(),
      async ({ manager }, res) => {
        const diaristPasswordChangeValidationVerify =
          new DiaristPasswordChangeValidationVerifyService();

        const diaristPasswordChangeValidationVerifyDocument =
          await diaristPasswordChangeValidationVerify.execute(
            manager.authenticated.id,
            manager.data,
          );

        res.json(diaristPasswordChangeValidationVerifyDocument);
      },
    );
  }
}
