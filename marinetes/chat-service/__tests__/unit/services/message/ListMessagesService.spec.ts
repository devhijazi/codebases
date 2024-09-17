import type { PrismaClient } from '@prisma/client';

import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prismaClient } from '@/prisma/client';
import { CreateChannelService } from '@/services/channel/CreateChannelService';
import { CreateMessageService } from '@/services/message/CreateMessageService';
import { ListMessagesService } from '@/services/message/ListMessagesService';
import { genearateFakeChannel } from '@tests/fakes/channel';
import { generateFakeMessage } from '@tests/fakes/message';
import { validMessage } from '@tests/utils/regex';

jest.mock('@/prisma/client', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

describe('ListMessagesService', () => {
  let prismaClientMock: DeepMockProxy<PrismaClient>;

  let createChannelService: CreateChannelService;
  let createMessageService: CreateMessageService;
  let listMessagesService: ListMessagesService;

  beforeEach(() => {
    prismaClientMock = prismaClient as DeepMockProxy<PrismaClient>;

    createChannelService = new CreateChannelService();
    createMessageService = new CreateMessageService();
    listMessagesService = new ListMessagesService();
  });

  afterEach(() => {
    mockReset(prismaClientMock);
  });

  it('should be able to return an array with 10 messages', async () => {
    const fakeChannel = genearateFakeChannel();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channel = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    const messagesCreated = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const fakeMessage = generateFakeMessage();

        prismaClientMock.message.create.mockResolvedValue(fakeMessage);

        const message = await createMessageService.execute({
          content: fakeMessage.content,
          authorId: fakeMessage.authorId,
          channelId: channel.id,
        });

        return message;
      }),
    );

    prismaClientMock.message.findMany.mockResolvedValue(messagesCreated);

    const messages = await listMessagesService.execute(channel.id);

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.message.create).toHaveBeenCalledTimes(10);
    expect(prismaClientMock.message.findMany).toHaveBeenCalledTimes(1);
    expect(messages).toHaveLength(10);
  });

  it('should be able to return an array of valid messages', async () => {
    const fakeChannel = genearateFakeChannel();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channel = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    const messagesCreated = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const fakeMessage = generateFakeMessage();

        prismaClientMock.message.create.mockResolvedValue(fakeMessage);

        const message = await createMessageService.execute({
          content: fakeMessage.content,
          authorId: fakeMessage.authorId,
          channelId: channel.id,
        });

        return message;
      }),
    );

    prismaClientMock.message.findMany.mockResolvedValue(messagesCreated);

    const messages = await listMessagesService.execute(channel.id);

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.message.create).toHaveBeenCalledTimes(10);
    expect(prismaClientMock.message.findMany).toHaveBeenCalledTimes(1);

    messages.forEach(message => {
      expect(message).toMatchObject(validMessage);
    });
  });
});
