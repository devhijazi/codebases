import { Logger } from '@marinetesio/logger';

import { producerConfig } from '@/config/kafka';

import { kafka } from './client';

export const topics = {
  marinetesMailerIssueEmail: 'marinetes-mailer.issue-email',
};

export const producer = kafka.producer(producerConfig);

export async function connectKafkaProducer(): Promise<void> {
  const logger = new Logger('Kafka');

  await producer.connect();

  logger.success('Producer running.');
}
