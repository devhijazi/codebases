import {
  ScheduleRepository,
  UserRepository,
  UserWalletRepository,
} from '@marinetesio/database/typeorm/mysql';
import { KafkaMessage } from 'kafkajs';

import { Topic } from '@/core/infra/kafka/Topic';
import { isJSON } from '@/utils/isJSON';

export interface SolicitationAcceptedTopicPayload {
  scheduleId: string;
}

export class SolicitationAcceptedTopic extends Topic {
  async execute(message: KafkaMessage): Promise<void> {
    if (!message || !message.value) {
      return;
    }

    const messageValue = message.value.toString();

    if (!isJSON(messageValue)) {
      return;
    }

    const payload = <SolicitationAcceptedTopicPayload>JSON.parse(messageValue);

    const schedule = await ScheduleRepository.findOne({
      where: { id: payload.scheduleId },
    });

    if (!schedule) {
      return;
    }

    const user = await UserRepository.findOne({
      where: { id: schedule.user_id },
      relations: ['wallet'],
    });

    if (!user || !user.wallet) {
      return;
    }

    await UserWalletRepository.update(user.wallet.id, {
      balance_available: user.wallet.balance_available - schedule.price,
      blocked_balance: user.wallet.blocked_balance + schedule.price,
    });
  }
}
