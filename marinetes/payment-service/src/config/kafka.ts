import {
  KafkaConfig,
  ProducerConfig,
  Partitioners,
  ConsumerConfig,
} from 'kafkajs';

import { environment } from './environment';

export const kafkaConfig: KafkaConfig = {
  brokers: [environment.kafkaHost],
  clientId: 'marinetes-payment',
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: environment.kafkaUsername,
    password: environment.kafkaPassword,
  },
};

export const mailerProducerConfig: ProducerConfig = {
  createPartitioner: Partitioners.DefaultPartitioner,
};

export const paymentConsumerConfig: ConsumerConfig = {
  groupId: 'marinetes-payment-group',
};

export const paymentTopics = [
  'marinetes-payment.solicitation-accepted',
  'marinetes-payment.schedule-doned',
  'marinetes-payment.schedule-canceled',
] as const;
