import type { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prismaClient } from '@/prisma/client';
import { CreateChannelService } from '@/services/channel/CreateChannelService';
import { GetChannelService } from '@/services/channel/GetChannelService';
import { genearateFakeChannel } from '@tests/fakes/channel';
import { validChannel } from '@tests/utils/regex';

jest.mock('@/prisma/client', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

describe('GetChannelService', () => {
  let prismaClientMock: DeepMockProxy<PrismaClient>;

  let createChannelService: CreateChannelService;
  let getChannelService: GetChannelService;

  beforeEach(() => {
    prismaClientMock = prismaClient as DeepMockProxy<PrismaClient>;

    createChannelService = new CreateChannelService();
    getChannelService = new GetChannelService();
  });

  afterEach(() => {
    mockReset(prismaClientMock);
  });

  it('should pass a valid channel id and must not return an empty object', async () => {
    const fakeChannel = genearateFakeChannel();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channelCreated = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    prismaClientMock.channel.findFirst.mockResolvedValue(channelCreated);

    const channel = await getChannelService.execute(channelCreated.id);

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.channel.findFirst).toHaveBeenCalledTimes(1);
    expect(channel.id).toMatch(validChannel.id);
  });

  it('should return an error when passing a non-existent or invalid channel id', async () => {
    const fakeChannelId = faker.database.mongodbObjectId();
    const fakeChannel = genearateFakeChannel();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    await expect(
      getChannelService.execute(fakeChannelId),
    ).rejects.toBeInstanceOf(Error);
    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.channel.findFirst).toHaveBeenCalledTimes(1);
  });
});
