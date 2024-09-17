import { Router } from 'express';

import { Controller, buildController } from '@/core/infra/http/Controller';
import { created, ok } from '@/core/infra/http/HttpResponse';
import { AddDiaristToQueueService } from '@/infra/services/queues/diarist/AddDiaristToQueueService';
import { GetAllDiaristsInQueueService } from '@/infra/services/queues/diarist/GetAllDiaristsInQueueService';
import { RemoveDiaristFromQueueService } from '@/infra/services/queues/diarist/RemoveDiaristFromQueueService';
import { AddUserToQueueService } from '@/infra/services/queues/user/AddUserToQueueService';
import { GetAllUsersInQueueService } from '@/infra/services/queues/user/GetAllUsersInQueueService';
import { RemoveUserFromQueueService } from '@/infra/services/queues/user/RemoveUserFromQueueService';

import { AddDiaristToQueueValidation } from '../validations/queues/AddDiaristToQueueValidation';
import { AddUserToQueueValidation } from '../validations/queues/AddUserToQueueValidation';
import { RemoveDiaristFromQueueValidation } from '../validations/queues/RemoveDiaristFromQueueValidation';
import { RemoveUserFromQueueValidation } from '../validations/queues/RemoveUserFromQueueValidation';

class QueueControllerStructure extends Controller {
  constructor() {
    super('queues');
  }

  execute(router: Router): void {
    const diaristRouter = this.newRouter();
    const userRouter = this.newRouter();

    router.use('/diarists', diaristRouter);

    diaristRouter.get('/', async (_request, response) => {
      const getAllDiaristsInQueue = new GetAllDiaristsInQueueService();

      const diaristsInQueue = await getAllDiaristsInQueue.execute();

      response.json({ diaristsInQueue });
    });

    diaristRouter.post(
      '/add',
      AddDiaristToQueueValidation.make(),
      async (request, response) => {
        const { diaristId } = request.manager.data;

        const addDiaristToQueue = new AddDiaristToQueueService();

        await addDiaristToQueue.execute({ diaristId });

        created(response);
      },
    );

    diaristRouter.delete(
      '/remove',
      RemoveDiaristFromQueueValidation.make(),
      async (request, response) => {
        const { diaristId } = request.manager.data;

        const removeDiaristFromQueue = new RemoveDiaristFromQueueService();

        await removeDiaristFromQueue.execute({ diaristId });

        ok(response);
      },
    );

    router.use('/users', userRouter);

    userRouter.get('/', async (_request, response) => {
      const getAllUsersInQueue = new GetAllUsersInQueueService();

      const usersInQueue = await getAllUsersInQueue.execute();

      response.json({ usersInQueue });
    });

    userRouter.post(
      '/add',
      AddUserToQueueValidation.make(),
      async (request, response) => {
        const { userId, budgetId } = request.manager.data;

        const addUserToQueue = new AddUserToQueueService();

        await addUserToQueue.execute({ userId, budgetId });

        created(response);
      },
    );

    userRouter.delete(
      '/remove',
      RemoveUserFromQueueValidation.make(),
      async (request, response) => {
        const { userId } = request.manager.data;

        const removeUserFromQueue = new RemoveUserFromQueueService();

        await removeUserFromQueue.execute({ userId });

        ok(response);
      },
    );
  }
}

export const QueueController = buildController(QueueControllerStructure);
