import type { PrismaClient } from '@prisma/client';

import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prismaClient } from '@/prisma/client';
import { CreateChannelService } from '@/services/channel/CreateChannelService';
import { CreateMessageService } from '@/services/message/CreateMessageService';
import { genearateFakeChannel } from '@tests/fakes/channel';
import { generateFakeMessage } from '@tests/fakes/message';
import { validMessage } from '@tests/utils/regex';

jest.mock('@/prisma/client', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

describe('CreateMessageService', () => {
  let prismaClientMock: DeepMockProxy<PrismaClient>;

  let createChannelService: CreateChannelService;
  let createMessageService: CreateMessageService;

  beforeEach(() => {
    prismaClientMock = prismaClient as DeepMockProxy<PrismaClient>;

    createChannelService = new CreateChannelService();
    createMessageService = new CreateMessageService();
  });

  afterEach(() => {
    mockReset(prismaClientMock);
  });

  it('should be able to create a message', async () => {
    const fakeChannel = genearateFakeChannel();
    const fakeMessage = generateFakeMessage();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channel = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    prismaClientMock.message.create.mockResolvedValue(fakeMessage);

    const message = await createMessageService.execute({
      content: fakeMessage.content,
      authorId: fakeMessage.authorId,
      channelId: channel.id,
    });

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.message.create).toHaveBeenCalledTimes(1);
    expect(message).toMatchObject(validMessage);
  });
});
