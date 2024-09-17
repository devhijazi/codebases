import {
  BudgetRepository,
  DiaristRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  BadRequestError,
  BudgetNotFoundError,
  DiaristNotFoundError,
} from '@marinetesio/errors';
import { Logger } from '@marinetesio/logger';
import { Job } from 'bullmq';

import { Service } from '@/core/infra/Service';
import { DiaristQueueData } from '@/infra/queue/queues/DiaristQueue';
import { hasConnectionByEntityId } from '@/infra/websocket/utils/connection';
import { Events } from '@/infra/websocket/utils/constants';
import { emitToEntity } from '@/infra/websocket/utils/event';

import { GetLastUserInQueueService } from '../user/GetLastUserInQueueService';

export interface CreateDiaristMatchingServiceRequest {
  diaristJob: Job<DiaristQueueData, boolean, string>;
  diaristJobData: DiaristQueueData;
}

export class CreateDiaristMatchingService implements Service {
  async execute(request: CreateDiaristMatchingServiceRequest): Promise<void> {
    const { diaristJob, diaristJobData } = request;

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristJobData.diaristId },
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    const getLastUserInQueue = new GetLastUserInQueueService();

    const lastUser = await getLastUserInQueue.execute();

    if (!lastUser) {
      throw new BadRequestError();
    }

    const { userJob, userJobData, user } = lastUser;

    await userJob.updateData({
      ...userJobData,
      accpetedMatching: true,
      relatedDiaristId: diaristJobData.diaristId,
    });

    await diaristJob.updateData({
      ...diaristJobData,
      accpetedMatching: true,
      relatedUserId: userJobData.userId,
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

    const logger = new Logger('DiaristMatching');

    logger.info(
      `A diarista "${diarist.full_name}" deu match com o usuário "${user.full_name}".`,
    );
  }
}
