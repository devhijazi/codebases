import { Router } from 'express';

import { ControllerBase } from '@/core/infra/http/bases/ControllerBase';
import { CreateUserPixDataService } from '@/infra/grpc/payment/services/users/pixes/CreateUserPixDataService';
import { DeleteUserPixDataService } from '@/infra/grpc/payment/services/users/pixes/DeleteUserPixDataService';
import { GetAllUserPixDataService } from '@/infra/grpc/payment/services/users/pixes/GetAllUserPixDataService';
import { GetUserPixDataService } from '@/infra/grpc/payment/services/users/pixes/GetUserPixDataService';
import { UpdateUserPixDataService } from '@/infra/grpc/payment/services/users/pixes/UpdateUserPixDataService';
import { GetUserWalletService } from '@/infra/grpc/payment/services/wallets/GetUserWalletService';
import { AuthenticationMiddleware } from '@/infra/http/middlewares/AuthenticationMiddleware';
import { ScheduleMiddleware } from '@/infra/http/middlewares/entities/ScheduleMiddleware';
import { UserAddressMiddleware } from '@/infra/http/middlewares/entities/UserAddressMiddleware';
import { UserAddressCreateService } from '@/infra/http/services/user/UserAddressCreateService';
import { UserAddressDeleteService } from '@/infra/http/services/user/UserAddressDeleteService';
import { UserAddressesGetService } from '@/infra/http/services/user/UserAddressesGetService';
import { UserAddressGetService } from '@/infra/http/services/user/UserAddressGetService';
import { UserAddressUpdateService } from '@/infra/http/services/user/UserAddressUpdateService';
import { UserBudgetCreateService } from '@/infra/http/services/user/UserBudgetCreateService';
import { UserGetService } from '@/infra/http/services/user/UserGetService';
import { UserScheduleGetService } from '@/infra/http/services/user/UserScheduleGetService';
import { UserScheduleListService } from '@/infra/http/services/user/UserScheduleListService';
import { PaginationValidation } from '@/infra/http/validations/mixin/PaginationValidation';
import { UserAddressCreateValidation } from '@/infra/http/validations/user/UserAddressCreateValidation';
import { UserAddressUpdateValidation } from '@/infra/http/validations/user/UserAddressUpdateValidation';
import { UserBudgetCreateValidation } from '@/infra/http/validations/user/UserBudgetCreateValidation';

import { GetAllBudgetByUserIdService } from '../services/budgets/GetAllBudgetByUserIdService';
import { GetBudgetByIdService } from '../services/budgets/GetBudgetByIdService';
import { UserScheduleAllListService } from '../services/user/UserScheduleAllListService';
import { CreateUserPixDataValidation } from '../validations/user/CreateUserPixDataVlidation';
import { UpdateUserPixDataValidation } from '../validations/user/UpdateUserPixDataVlidation';

export class MeController extends ControllerBase {
  constructor() {
    super('me', [AuthenticationMiddleware.make()]);
  }

  load(router: Router): void {
    const pixesRouter = this.newRouter();
    const addressesRoute = this.newRouter();
    const addressGetRoute = this.newRouter();
    const scheduleRoute = this.newRouter();
    const scheduleGetRoute = this.newRouter();

    router.get('/', async ({ manager }, res) => {
      const userGet = new UserGetService();
      const userDocument = await userGet.execute(manager.authenticated.id);

      res.json(userDocument);
    });

    // router.patch(
    //   '/avatar',
    //   FileMiddleware.make({
    //     config: avatarConfig,
    //     handler: upload => upload.single('avatar'),
    //   }),
    //   async ({ file, manager }, res) => {
    //     const userUpdateAvatar = new UserUpdateAvatarService();

    //     await userUpdateAvatar.execute(manager.authenticated.id, file);

    //     res.status(200).end();
    //   },
    // );

    // Orçamento

    router.get('/budgets', async (req, res) => {
      const { authenticated } = req.manager;

      const getAllBudgetByUserId = new GetAllBudgetByUserIdService();

      const budgets = await getAllBudgetByUserId.execute({
        userId: authenticated.id,
      });

      res.json(budgets);
    });

    router.post(
      '/budgets',
      UserBudgetCreateValidation.make(),
      async ({ manager }, res) => {
        const userBudgetCreate = new UserBudgetCreateService();

        const budgetDocument = await userBudgetCreate.execute({
          userId: manager.authenticated.id,
          data: manager.data,
        });

        res.json(budgetDocument);
      },
    );

    router.get('/budgets/:budgetId', async (req, res) => {
      const { budgetId } = req.params;

      const getBudgetById = new GetBudgetByIdService();

      const budget = await getBudgetById.execute({
        budgetId,
      });

      res.json(budget);
    });

    router.get('/wallet', async ({ manager }, res) => {
      const getUserWallet = new GetUserWalletService();

      const wallet = await getUserWallet.execute({
        userId: manager.authenticated.id,
      });

      res.json(wallet);
    });

    router.use('/pixes', pixesRouter);

    pixesRouter.post(
      '/',
      CreateUserPixDataValidation.make(),
      async ({ manager }, res) => {
        const createUserPixData = new CreateUserPixDataService();

        await createUserPixData.execute({
          userId: manager.authenticated.id,
          ...manager.data,
        });

        res.status(201).end();
      },
    );

    pixesRouter.get('/', async ({ manager }, res) => {
      const getAllUserPixData = new GetAllUserPixDataService();

      const pixes = await getAllUserPixData.execute({
        userId: manager.authenticated.id,
      });

      res.json(pixes);
    });

    pixesRouter.get('/:pixDataId', async ({ params }, res) => {
      const getUserPixData = new GetUserPixDataService();

      const pixData = await getUserPixData.execute({
        pixDataId: params.pixDataId,
      });

      res.json(pixData);
    });

    pixesRouter.patch(
      '/:pixDataId',
      UpdateUserPixDataValidation.make(),
      async ({ params, manager }, res) => {
        const updateUserPixData = new UpdateUserPixDataService();

        await updateUserPixData.execute({
          pixDataId: params.pixDataId,
          ...manager.data,
        });

        res.status(204).end();
      },
    );

    pixesRouter.delete('/:pixDataId', async ({ params }, res) => {
      const deleteUserPixData = new DeleteUserPixDataService();

      await deleteUserPixData.execute({
        pixDataId: params.pixDataId,
      });

      res.status(204).end();
    });

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

    scheduleRoute.get('/all', async ({ manager }, res) => {
      const userScheduleAllList = new UserScheduleAllListService();

      const schedules = await userScheduleAllList.execute(
        manager.authenticated.id,
      );

      res.json(schedules);
    });

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
