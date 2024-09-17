import { Logger } from '@marinetesio/logger';

import { paymentConsumerConfig, paymentTopics } from '@/config/kafka';

import { kafka } from '../../client';
import { ScheduleCanceledTopic } from './topics/ScheduleCanceledTopic';
import { ScheduleDonedTopic } from './topics/ScheduleDonedTopic';
import { SolicitationAcceptedTopic } from './topics/SolicitationAcceptedTopic';

export type PaymentTopic = typeof paymentTopics[number];

export const paymentConsumer = kafka.consumer(paymentConsumerConfig);

export async function startPaymentConsumer(): Promise<void> {
  const logger = new Logger('PaymentKafkaConsumer');

  await paymentConsumer.connect();

  await Promise.all(
    paymentTopics.map(topic => {
      return paymentConsumer.subscribe({ topic });
    }),
  );

  await paymentConsumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        switch (topic as PaymentTopic) {
          case 'marinetes-payment.solicitation-accepted': {
            const solicitationAccepted = new SolicitationAcceptedTopic();

            await solicitationAccepted.execute(message);

            return;
          }

          case 'marinetes-payment.schedule-doned': {
            const scheduleDoned = new ScheduleDonedTopic();

            await scheduleDoned.execute(message);

            return;
          }

          case 'marinetes-payment.schedule-canceled': {
            const scheduleCanceled = new ScheduleCanceledTopic();

            await scheduleCanceled.execute(message);

            return;
          }

          default: {
            return;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  logger.success('Consumer running.');
}
