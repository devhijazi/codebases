import { Router } from 'express';

import { avatarUploadConfig } from '@/config/upload/avatar';
import { FileMiddleware } from '@/http/middlewares/FileMiddleware';
import { DiaristChangeAcceptingServicesValidation } from '@/http/validations/diarist/DiaristChangeAcceptingServicesValidation';
import { DiaristPasswordChangeValidation } from '@/http/validations/diarist/DiaristPasswordChangeValidation';
import { DiaristPasswordChangeValidationVerifyValidation } from '@/http/validations/diarist/DiaristPasswordChangeValidationVerifyValidation';
import { DiaristUpdateAcceptedServicesValidation } from '@/http/validations/diarist/DiaristUpdateAcceptedServicesValidation';
import { PaginationValidation } from '@/http/validations/mixin/PaginationValidation';
import { DiaristAcceptedServicesListService } from '@/infra/services/diarist/DiaristAcceptedServicesListService';
import { DiaristChangeAcceptingServicesService } from '@/infra/services/diarist/DiaristChangeAcceptingServicesService';
import { DiaristGetService } from '@/infra/services/diarist/DiaristGetService';
import { DiaristInfoService } from '@/infra/services/diarist/DiaristInfoService';
import { DiaristPasswordChangeService } from '@/infra/services/diarist/DiaristPasswordChangeService';
import { DiaristPasswordChangeValidationCreateService } from '@/infra/services/diarist/DiaristPasswordChangeValidationCreateService';
import { DiaristPasswordChangeValidationVerifyService } from '@/infra/services/diarist/DiaristPasswordChangeValidationVerifyService';
import { DiaristScheduleListService } from '@/infra/services/diarist/DiaristScheduleListService';
import { DiaristUpdateAcceptedServicesService } from '@/infra/services/diarist/DiaristUpdateAcceptedServicesService';
import { DiaristUpdateAvatarService } from '@/infra/services/diarist/DiaristUpdateAvatarService';
import { ControllerBase } from '@bases/ControllerBase';
import { AuthenticationMiddleware } from '@http/middlewares/AuthenticationMiddleware';

export class MeController extends ControllerBase {
  constructor() {
    super('me', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
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

    // Obter serviços aceitos

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

    router.patch(
      '/avatar',
      FileMiddleware.make({
        config: avatarUploadConfig,
        handler: upload => upload.single('avatar'),
      }),
      async ({ file, manager }, res) => {
        const diaristUpdateAvatar = new DiaristUpdateAvatarService();

        await diaristUpdateAvatar.execute(manager.authenticated.id, file);

        res.status(200).end();
      },
    );

    // Change Password

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
