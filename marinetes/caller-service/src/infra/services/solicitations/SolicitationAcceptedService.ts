import { BudgetRepository } from '@marinetesio/database/typeorm/mysql';
import { BadRequestError, BudgetNotFoundError } from '@marinetesio/errors';

import { paymentTopics } from '@/config/kafka';
import { Service } from '@/core/infra/Service';
import { paymentProducer } from '@/infra/kafka';
import { diaristQueue } from '@/infra/queue/queues/DiaristQueue';
import { userQueue } from '@/infra/queue/queues/UserQueue';
import { hasConnectionByEntityId } from '@/infra/websocket/utils/connection';
import { Events } from '@/infra/websocket/utils/constants';
import { emitToEntity } from '@/infra/websocket/utils/event';

import { GetDiaristJobByDiaristIdService } from '../queues/diarist/GetDiaristJobByDiaristIdService';
import { GetUserJobByUserIdService } from '../queues/user/GetUserJobByUserIdService';
import { CreateScheduleService } from '../schedules/CreateScheduleService';

export interface SolicitationAcceptedServiceRequest {
  diaristId: string;
}

export class SolicitationAcceptedService implements Service {
  async execute(request: SolicitationAcceptedServiceRequest): Promise<void> {
    const { diaristId } = request;

    const getDiaristJobByDiaristId = new GetDiaristJobByDiaristIdService();

    const { diaristJob, diaristJobData, diarist } =
      await getDiaristJobByDiaristId.execute({
        diaristId,
      });

    if (!diaristJobData.accpetedMatching || !diaristJobData.relatedUserId) {
      throw new BadRequestError();
    }

    const getUserJobByUserId = new GetUserJobByUserIdService();

    const { userJob, userJobData, user } = await getUserJobByUserId.execute({
      userId: diaristJobData.relatedUserId,
    });

    const budget = await BudgetRepository.findOne({
      where: { id: userJobData.budgetId },
      relations: ['services'],
    });

    if (!budget) {
      throw new BudgetNotFoundError();
    }

    await diaristQueue.remove(diaristJob.id as string);
    await userQueue.remove(userJob.id as string);

    const hasUserConnected = hasConnectionByEntityId(userJobData.userId);

    if (hasUserConnected) {
      emitToEntity(userJobData.userId, Events.solicitationAccepted, {
        diarist,
        budget,
      });
    }

    const createSchedule = new CreateScheduleService();

    const schedule = await createSchedule.execute({
      userId: user.id,
      budgetId: budget.id,
      diaristId: diarist.id,
    });

    await paymentProducer.send({
      topic: paymentTopics.solicitationAccepted,
      messages: [{ value: JSON.stringify({ scheduleId: schedule.id }) }],
    });
  }
}
