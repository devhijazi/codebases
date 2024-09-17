import { Logger } from '@marinetesio/logger';

import { paymentProducerConfig } from '@/config/kafka';

import { kafka } from '../client';

export const paymentProducer = kafka.producer(paymentProducerConfig);

export async function connectPaymentKafkaProducer(): Promise<void> {
  const logger = new Logger('PaymentKafkaProducer');

  await paymentProducer.connect();

  logger.success('Producer running.');
}
