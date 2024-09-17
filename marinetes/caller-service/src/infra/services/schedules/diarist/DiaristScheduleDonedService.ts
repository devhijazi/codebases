import {
  DiaristRepository,
  ScheduleRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  DiaristNotFoundError,
  ScheduleDonedError,
  ScheduleNotFoundError,
} from '@marinetesio/errors';

import { paymentTopics } from '@/config/kafka';
import { Service } from '@/core/infra/Service';
import { paymentProducer } from '@/infra/kafka';
import { hasConnectionByEntityId } from '@/infra/websocket/utils/connection';
import { Events } from '@/infra/websocket/utils/constants';
import { emitToEntity } from '@/infra/websocket/utils/event';

export interface DiaristScheduleDonedServiceRequest {
  diaristId: string;
  scheduleId: string;
}

export class DiaristScheduleDonedService implements Service {
  async execute(request: DiaristScheduleDonedServiceRequest): Promise<void> {
    const { scheduleId, diaristId } = request;

    const schedule = await ScheduleRepository.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new ScheduleNotFoundError();
    }

    if (schedule.status === 'done') {
      throw new ScheduleDonedError();
    }

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    const user = await UserRepository.findOne({
      where: { id: schedule.user_id },
    });

    if (!user) {
      throw new DiaristNotFoundError();
    }

    await ScheduleRepository.update(schedule.id, {
      status: 'done',
    });

    const hasUserConnected = hasConnectionByEntityId(user.id);

    if (hasUserConnected) {
      emitToEntity(user.id, Events.scheduleDoned, {
        schedule,
        diarist,
        user,
      });
    }

    await paymentProducer.send({
      topic: paymentTopics.scheduleDoned,
      messages: [{ value: JSON.stringify({ scheduleId: schedule.id }) }],
    });
  }
}
