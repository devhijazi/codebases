import {
  BudgetRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  BadRequestError,
  BudgetNotFoundError,
  UserNotFoundError,
} from '@marinetesio/errors';
import { Logger } from '@marinetesio/logger';
import { Job } from 'bullmq';

import { Service } from '@/core/infra/Service';
import { UserQueueData } from '@/infra/queue/queues/UserQueue';
import { hasConnectionByEntityId } from '@/infra/websocket/utils/connection';
import { Events } from '@/infra/websocket/utils/constants';
import { emitToEntity } from '@/infra/websocket/utils/event';

import { GetLastDiaristInQueueService } from '../diarist/GetLastDiaristInQueueService';

export interface CreateUserMatchingServiceRequest {
  userJob: Job<UserQueueData, boolean, string>;
  userJobData: UserQueueData;
}

export class CreateUserMatchingService implements Service {
  async execute(request: CreateUserMatchingServiceRequest): Promise<void> {
    const { userJob, userJobData } = request;

    const user = await UserRepository.findOne({
      where: { id: userJobData.userId },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const getLastDiaristInQueue = new GetLastDiaristInQueueService();

    const lastDiarist = await getLastDiaristInQueue.execute();

    if (!lastDiarist) {
      throw new BadRequestError();
    }

    const { diaristJob, diaristJobData, diarist } = lastDiarist;

    await diaristJob.updateData({
      ...diaristJobData,
      accpetedMatching: true,
      relatedUserId: userJobData.userId,
    });

    await userJob.updateData({
      ...userJobData,
      accpetedMatching: true,
      relatedDiaristId: diaristJobData.diaristId,
    });

    const budget = await BudgetRepository.findOne({
      where: { id: userJobData.budgetId },
      relations: ['services'],
    });

    if (!budget) {
      throw new BudgetNotFoundError();
    }

    const hasDiaristConnected = hasConnectionByEntityId(
      diaristJobData.diaristId,
    );

    const hasUserConnected = hasConnectionByEntityId(userJobData.userId);

    if (hasDiaristConnected) {
      emitToEntity(diaristJobData.diaristId, Events.solicitationFound, {
        user,
        budget,
      });
    }

    if (hasUserConnected) {
      emitToEntity(userJobData.userId, Events.solicitationWaitingAccept, {
        diarist,
        budget,
      });
    }

    const logger = new Logger('UserMatching');

    logger.info(
      `O usuário "${user.full_name}" deu match com a diarista "${diarist.full_name}".`,
    );
  }
}
