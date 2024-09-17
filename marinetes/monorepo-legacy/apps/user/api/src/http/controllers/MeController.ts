import { Router } from 'express';

import { avatarConfig } from '@/config/upload/avatar';
import { ScheduleMiddleware } from '@/http/middlewares/entities/ScheduleMiddleware';
import { FileMiddleware } from '@/http/middlewares/FileMiddleware';
import { PaginationValidation } from '@/http/validations/mixin/PaginationValidation';
import { UserAddressUpdateValidation } from '@/http/validations/user/UserAddressUpdateValidation';
import { UserBudgetCreateValidation } from '@/http/validations/user/UserBudgetCreateValidation';
import { UserScheduleCreateValidation } from '@/http/validations/user/UserScheduleCreateValidation';
import { UserAddressesGetService } from '@/infra/services/user/UserAddressesGetService';
import { UserAddressGetService } from '@/infra/services/user/UserAddressGetService';
import { UserAddressUpdateService } from '@/infra/services/user/UserAddressUpdateService';
import { UserBudgetCreateService } from '@/infra/services/user/UserBudgetCreateService';
import { UserScheduleCreateService } from '@/infra/services/user/UserScheduleCreateService';
import { UserScheduleGetService } from '@/infra/services/user/UserScheduleGetService';
import { UserScheduleListService } from '@/infra/services/user/UserScheduleListService';
import { UserUpdateAvatarService } from '@/infra/services/user/UserUpdateAvatarService';
import { ControllerBase } from '@bases/ControllerBase';
import { AuthenticationMiddleware } from '@http/middlewares/AuthenticationMiddleware';
import { UserAddressMiddleware } from '@http/middlewares/entities/UserAddressMiddleware';
import { UserAddressCreateValidation } from '@http/validations/user/UserAddressCreateValidation';
import { UserAddressCreateService } from '@infra/services/user/UserAddressCreateService';
import { UserAddressDeleteService } from '@infra/services/user/UserAddressDeleteService';
import { UserGetService } from '@infra/services/user/UserGetService';

export class MeController extends ControllerBase {
  constructor() {
    super('me', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    const addressesRoute = this.newRouter();
    const addressGetRoute = this.newRouter();
    const scheduleRoute = this.newRouter();
    const scheduleGetRoute = this.newRouter();

    router.get('/', async ({ manager }, res) => {
      const userGet = new UserGetService();
      const userDocument = await userGet.execute(manager.authenticated.id);

      res.json(userDocument);
    });

    router.patch(
      '/avatar',
      FileMiddleware.make({
        config: avatarConfig,
        handler: upload => upload.single('avatar'),
      }),
      async ({ file, manager }, res) => {
        const userUpdateAvatar = new UserUpdateAvatarService();

        await userUpdateAvatar.execute(manager.authenticated.id, file);

        res.status(200).end();
      },
    );

    // Orçamento

    router.post(
      '/budgets',
      UserBudgetCreateValidation.make(),
      async ({ manager }, res) => {
        const userBudgetCreate = new UserBudgetCreateService();
        const budgetDocument = await userBudgetCreate.execute(
          manager.authenticated.id,
          manager.data,
        );

        res.json(budgetDocument);
      },
    );

    // Agendamento

    router.use('/schedules', scheduleRoute);

    scheduleRoute.get(
      '/',
      PaginationValidation.make(),
      async ({ manager }, res) => {
        const userScheduleList = new UserScheduleListService();
        const scheduleListDocument = await userScheduleList.execute(
          manager.authenticated.id,
          manager.data,
        );

        res.json(scheduleListDocument);
      },
    );

    scheduleRoute.post(
      '/',
      UserScheduleCreateValidation.make(),
      async ({ manager }, res) => {
        const userScheduleCreate = new UserScheduleCreateService();
        const scheduleCreatedDocument = await userScheduleCreate.execute(
          manager.authenticated.id,
          manager.data,
        );

        res.json(scheduleCreatedDocument);
      },
    );

    scheduleRoute.use(
      '/:scheduleId',
      ScheduleMiddleware.make(),
      scheduleGetRoute,
    );

    scheduleGetRoute.get('/', async ({ manager }, res) => {
      const userScheduleGet = new UserScheduleGetService();
      const scheduleDocument = await userScheduleGet.execute(
        manager.authenticated.id,
        manager.schedule.id,
      );

      res.json(scheduleDocument);
    });

    // Endereço

    router.use('/addresses', addressesRoute);

    addressesRoute.get('/', async ({ manager }, res) => {
      const userAddressesGet = new UserAddressesGetService();
      const userAddressDocumentArray = await userAddressesGet.execute(
        manager.authenticated.id,
      );

      res.json(userAddressDocumentArray);
    });

    addressesRoute.post(
      '/',
      UserAddressCreateValidation.make(),
      async ({ manager }, res) => {
        const userAddressCreate = new UserAddressCreateService();

        await userAddressCreate.execute(manager.authenticated.id, manager.data);

        res.status(200).end();
      },
    );

    addressesRoute.use(
      '/:addressId',
      UserAddressMiddleware.make(),
      addressGetRoute,
    );

    addressGetRoute.get('/', async ({ manager }, res) => {
      const userAddressGet = new UserAddressGetService();
      const userAddressDocument = await userAddressGet.execute(
        manager.authenticated.id,
        manager.userAddress.id,
      );

      res.json(userAddressDocument);
    });

    addressGetRoute.put(
      '/',
      UserAddressUpdateValidation.make(),
      async ({ manager }, res) => {
        const userAddressUpdate = new UserAddressUpdateService();

        await userAddressUpdate.execute(
          manager.authenticated.id,
          manager.userAddress.id,
          manager.data,
        );

        res.status(200).end();
      },
    );

    addressGetRoute.delete('/', async ({ manager }, res) => {
      const userAddressDelete = new UserAddressDeleteService();

      await userAddressDelete.execute(
        manager.authenticated.id,
        manager.userAddress.id,
      );

      res.status(200).end();
    });
  }
}
