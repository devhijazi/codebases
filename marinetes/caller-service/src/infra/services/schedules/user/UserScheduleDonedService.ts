import {
  DiaristRepository,
  ScheduleRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  DiaristNotFoundError,
  ScheduleNotFoundError,
  ScheduleDonedError,
} from '@marinetesio/errors';

import { paymentTopics } from '@/config/kafka';
import { Service } from '@/core/infra/Service';
import { paymentProducer } from '@/infra/kafka';
import { hasConnectionByEntityId } from '@/infra/websocket/utils/connection';
import { Events } from '@/infra/websocket/utils/constants';
import { emitToEntity } from '@/infra/websocket/utils/event';

export interface UserScheduleDonedServiceRequest {
  userId: string;
  scheduleId: string;
}

export class UserScheduleDonedService implements Service {
  async execute(request: UserScheduleDonedServiceRequest): Promise<void> {
    const { scheduleId, userId } = request;

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
      where: { id: schedule.diarist_id },
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    const user = await UserRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new DiaristNotFoundError();
    }

    await ScheduleRepository.update(schedule.id, {
      status: 'done',
    });

    const hasDiaristConnected = hasConnectionByEntityId(diarist.id);

    if (hasDiaristConnected) {
      emitToEntity(diarist.id, Events.scheduleDoned, {
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
