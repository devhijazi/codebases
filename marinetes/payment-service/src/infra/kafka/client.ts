import { Kafka } from 'kafkajs';

import { kafkaConfig } from '@/config/kafka';

export const kafka = new Kafka(kafkaConfig);
