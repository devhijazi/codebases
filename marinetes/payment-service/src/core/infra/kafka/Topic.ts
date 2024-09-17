import { KafkaMessage } from 'kafkajs';

export abstract class Topic {
  abstract execute(message: KafkaMessage): Promise<void>;
}
