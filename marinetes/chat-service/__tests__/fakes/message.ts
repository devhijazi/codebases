import { faker } from '@faker-js/faker';
import { Message } from '@prisma/client';

export function generateFakeMessage(
  status: Message['status'] = 'NOT_READ',
): Message {
  return {
    id: faker.database.mongodbObjectId(),
    content: 'Hi! How are you?',
    authorId: faker.datatype.uuid(),
    channelId: faker.datatype.uuid(),
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
