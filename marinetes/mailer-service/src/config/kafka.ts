import { KafkaConfig, ConsumerConfig } from 'kafkajs';

import { environment } from './environment';

export const kafkaConfig: KafkaConfig = {
  brokers: [environment.kafkaHost],
  clientId: 'marinetes-mailer',
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: environment.kafkaUsername,
    password: environment.kafkaPassword,
  },
};

export const consumerConfig: ConsumerConfig = {
  groupId: 'email-group',
};

export const topics = ['marinetes-mailer.issue-email'] as const;
