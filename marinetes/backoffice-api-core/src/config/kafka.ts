import { KafkaConfig, ProducerConfig, Partitioners } from 'kafkajs';

import { environment } from './environment';

export const kafkaConfig: KafkaConfig = {
  brokers: [environment.kafkaHost],
  clientId: 'marinetes-api',
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: environment.kafkaUsername,
    password: environment.kafkaPassword,
  },
};

export const producerConfig: ProducerConfig = {
  createPartitioner: Partitioners.DefaultPartitioner,
};
