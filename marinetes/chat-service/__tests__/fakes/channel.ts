import { faker } from '@faker-js/faker';
import { Channel } from '@prisma/client';

export function genearateFakeChannel(
  status: Channel['status'] = 'OPEN',
): Channel {
  return {
    id: faker.database.mongodbObjectId(),
    userId: faker.datatype.uuid(),
    diaristId: faker.datatype.uuid(),
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
