import type { PrismaClient } from '@prisma/client';

import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prismaClient } from '@/prisma/client';
import { CreateChannelService } from '@/services/channel/CreateChannelService';
import { ListChannelsService } from '@/services/channel/ListChannelsService';
import { genearateFakeChannel } from '@tests/fakes/channel';
import { validChannel } from '@tests/utils/regex';

jest.mock('@/prisma/client', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

describe('ListChannelsService', () => {
  let prismaClientMock: DeepMockProxy<PrismaClient>;

  let createChannelService: CreateChannelService;
  let listChannelsService: ListChannelsService;

  beforeEach(() => {
    prismaClientMock = prismaClient as DeepMockProxy<PrismaClient>;

    createChannelService = new CreateChannelService();
    listChannelsService = new ListChannelsService();
  });

  afterEach(() => {
    mockReset(prismaClientMock);
  });

  it('should be able to return an array with 10 channels', async () => {
    const channelsCreated = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const fakeChannel = genearateFakeChannel();

        prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

        const channel = await createChannelService.execute({
          userId: fakeChannel.userId,
          diaristId: fakeChannel.diaristId,
        });

        return channel;
      }),
    );

    prismaClientMock.channel.findMany.mockResolvedValue(channelsCreated);

    const channels = await listChannelsService.execute();

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(10);
    expect(prismaClientMock.channel.findMany).toHaveBeenCalledTimes(1);
    expect(channels).toHaveLength(10);
  });

  it('should be able to return an array of valid channels', async () => {
    const channelsCreated = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const fakeChannel = genearateFakeChannel();

        prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

        const channel = await createChannelService.execute({
          userId: fakeChannel.userId,
          diaristId: fakeChannel.diaristId,
        });

        return channel;
      }),
    );

    prismaClientMock.channel.findMany.mockResolvedValue(channelsCreated);

    const channels = await listChannelsService.execute();

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(10);
    expect(prismaClientMock.channel.findMany).toHaveBeenCalledTimes(1);

    channels.forEach(channel => {
      expect(channel).toMatchObject(validChannel);
    });
  });
});
