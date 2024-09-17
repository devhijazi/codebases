import { Logger } from '@marinetesio/logger';

import { mailerProducerConfig } from '@/config/kafka';

import { kafka } from '../client';

export const mailerTopics = {
  marinetesMailerIssueEmail: 'marinetes-mailer.issue-email',
};

export const mailerProducer = kafka.producer(mailerProducerConfig);

export async function connectMailerKafkaProducer(): Promise<void> {
  const logger = new Logger('MailerKafkaProducer');

  await mailerProducer.connect();

  logger.success('Producer running.');
}
