import { KafkaConfig, Partitioners, ProducerConfig } from 'kafkajs';

import { environment } from './environment';

export const kafkaConfig: KafkaConfig = {
  brokers: [environment.kafkaHost],
  clientId: 'marinetes-caller',
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: environment.kafkaUsername,
    password: environment.kafkaPassword,
  },
};

export const paymentProducerConfig: ProducerConfig = {
  createPartitioner: Partitioners.DefaultPartitioner,
};

export const paymentTopics = {
  solicitationAccepted: 'marinetes-payment.solicitation-accepted',
  scheduleDoned: 'marinetes-payment.schedule-doned',
  scheduleCanceled: 'marinetes-payment.schedule-canceled',
};
