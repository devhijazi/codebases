import { consumerConfig, topics } from '@/config/kafka';

import { kafka } from './client';
import { IssueEmailConsumer } from './consumers/IssueEmailConsumer';

export type Topic = typeof topics[number];

export const consumer = kafka.consumer(consumerConfig);

export async function startConsumer(): Promise<void> {
  await consumer.connect();

  await Promise.all(
    topics.map(topic => {
      return consumer.subscribe({ topic });
    }),
  );

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        switch (topic as Topic) {
          case 'marinetes-mailer.issue-email': {
            const issueEmailConsumer = new IssueEmailConsumer();

            await issueEmailConsumer.execute(message);

            break;
          }
          default: {
            break;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
}
