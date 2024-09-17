import {
  DiaristRepository,
  DiaristWalletRepository,
  MarinetesWalletRepository,
  ScheduleRepository,
  UserRepository,
  UserWalletRepository,
} from '@marinetesio/database/typeorm/mysql';
import { KafkaMessage } from 'kafkajs';

import { Topic } from '@/core/infra/kafka/Topic';
import { GetMarinetesWalletService } from '@/infra/services/wallets/GetMarinetesWalletService';
import { isJSON } from '@/utils/isJSON';

export interface ScheduleDonedTopicPayload {
  scheduleId: string;
}

export class ScheduleDonedTopic extends Topic {
  async execute(message: KafkaMessage): Promise<void> {
    if (!message || !message.value) {
      return;
    }

    const messageValue = message.value.toString();

    if (!isJSON(messageValue)) {
      return;
    }

    const payload = <ScheduleDonedTopicPayload>JSON.parse(messageValue);

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

    const diarist = await DiaristRepository.findOne({
      where: { id: schedule.diarist_id },
      relations: ['wallet'],
    });

    if (!diarist || !diarist.wallet) {
      return;
    }

    const diaristValue = schedule.price * (80 / 100);
    const marinetesValue = schedule.price * (20 / 100);

    await UserWalletRepository.update(user.wallet.id, {
      blocked_balance: user.wallet.blocked_balance - schedule.price,
    });

    const getMarinetesWallet = new GetMarinetesWalletService();

    const marinetesWallet = await getMarinetesWallet.execute();

    await MarinetesWalletRepository.update(marinetesWallet.id, {
      balance: marinetesWallet.balance + marinetesValue,
    });

    await DiaristWalletRepository.update(diarist.wallet.id, {
      balance: diarist.wallet.balance + diaristValue,
    });
  }
}
