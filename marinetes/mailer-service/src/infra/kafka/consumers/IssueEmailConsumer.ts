import { KafkaMessage } from 'kafkajs';

import { Consumer } from '@/core/infra/kafka/Consumer';
import { MailerQueue } from '@/infra/bull/queues/MailerQueue';
import { isJSON } from '@/utils/isJSON';

export interface IssueEmailPayload {
  subject: string;
  to: string;
  template: {
    name: string;
    group: string;
    context: Record<string, unknown>;
  };
}

export class IssueEmailConsumer extends Consumer {
  constructor() {
    super();
  }

  async execute(message: KafkaMessage): Promise<void> {
    if (!message || !message.value) {
      return;
    }

    const value = message.value.toString();

    if (!isJSON(value)) {
      return;
    }

    const payload = JSON.parse(value) as IssueEmailPayload;

    try {
      const mailerQueue = new MailerQueue();

      await mailerQueue.add({
        subject: payload.subject,
        to: payload.to,
        template: {
          name: payload.template.name,
          group: payload.template.group,
          context: payload.template.context,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
