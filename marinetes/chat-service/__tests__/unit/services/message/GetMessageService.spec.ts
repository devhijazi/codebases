import type { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prismaClient } from '@/prisma/client';
import { CreateChannelService } from '@/services/channel/CreateChannelService';
import { CreateMessageService } from '@/services/message/CreateMessageService';
import { GetMessageService } from '@/services/message/GetMessageService';
import { genearateFakeChannel } from '@tests/fakes/channel';
import { generateFakeMessage } from '@tests/fakes/message';
import { validMessage } from '@tests/utils/regex';

jest.mock('@/prisma/client', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

describe('GetMessageService', () => {
  let prismaClientMock: DeepMockProxy<PrismaClient>;

  let createChannelService: CreateChannelService;
  let createMessageService: CreateMessageService;
  let getMessageService: GetMessageService;

  beforeEach(() => {
    prismaClientMock = prismaClient as DeepMockProxy<PrismaClient>;

    createChannelService = new CreateChannelService();
    createMessageService = new CreateMessageService();
    getMessageService = new GetMessageService();
  });

  afterEach(() => {
    mockReset(prismaClientMock);
  });

  it('should pass a valid message id and must not return an empty object', async () => {
    const fakeChannel = genearateFakeChannel();
    const fakeMessage = generateFakeMessage();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channel = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    prismaClientMock.message.create.mockResolvedValue(fakeMessage);

    const messageCreated = await createMessageService.execute({
      content: fakeMessage.content,
      authorId: fakeMessage.authorId,
      channelId: channel.id,
    });

    prismaClientMock.message.findFirst.mockResolvedValue(messageCreated);

    const message = await getMessageService.execute({
      messageId: messageCreated.id,
      channelId: messageCreated.channelId,
    });

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.message.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.message.findFirst).toHaveBeenCalledTimes(1);
    expect(message?.id).toMatch(validMessage.id);
  });

  it('should return null when passing a non-existent message or channel id', async () => {
    const fakeMessageId = faker.database.mongodbObjectId();
    const fakeChannelId = faker.database.mongodbObjectId();

    const fakeChannel = genearateFakeChannel();
    const fakeMessage = generateFakeMessage();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channel = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    prismaClientMock.message.create.mockResolvedValue(fakeMessage);

    await createMessageService.execute({
      content: fakeMessage.content,
      authorId: fakeMessage.authorId,
      channelId: channel.id,
    });

    const message = await getMessageService.execute({
      messageId: fakeMessageId,
      channelId: fakeChannelId,
    });

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.message.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.message.findFirst).toHaveBeenCalledTimes(1);
    expect(message).toBe(null);
  });
});
