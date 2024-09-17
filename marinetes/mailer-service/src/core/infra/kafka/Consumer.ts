import { KafkaMessage } from 'kafkajs';

export abstract class Consumer {
  abstract execute(message: KafkaMessage): Promise<void>;
}
