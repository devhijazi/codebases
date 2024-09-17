import {
  Kafka,
  Partitioners,
  KafkaConfig,
  ProducerConfig,
  ConsumerConfig,
} from 'kafkajs';

const { KAFKA_BROKERS, KAFKA_CLIENT_ID, KAFKA_GROUP_ID } = process.env;

export const kafkaConfig: KafkaConfig = {
  brokers: String(KAFKA_BROKERS).split(', '),
  clientId: KAFKA_CLIENT_ID,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
};

export const kafkaProducerConfig: ProducerConfig = {
  createPartitioner: Partitioners.DefaultPartitioner,
};

export const kafkaConsumerConfig: ConsumerConfig = {
  groupId: KAFKA_GROUP_ID,
};

export const client = new Kafka(kafkaConfig);

export const producer = client.producer(kafkaProducerConfig);
export const consumer = client.consumer(kafkaConsumerConfig);
