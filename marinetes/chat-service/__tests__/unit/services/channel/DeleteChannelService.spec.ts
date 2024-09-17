import type { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prismaClient } from '@/prisma/client';
import { CreateChannelService } from '@/services/channel/CreateChannelService';
import { DeleteChannelService } from '@/services/channel/DeleteChannelService';
import { genearateFakeChannel } from '@tests/fakes/channel';
import { validChannel } from '@tests/utils/regex';

jest.mock('@/prisma/client', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

describe('DeleteChannelService', () => {
  let prismaClientMock: DeepMockProxy<PrismaClient>;

  let createChannelService: CreateChannelService;
  let deleteChannelService: DeleteChannelService;

  beforeEach(() => {
    prismaClientMock = prismaClient as DeepMockProxy<PrismaClient>;

    createChannelService = new CreateChannelService();
    deleteChannelService = new DeleteChannelService();
  });

  afterEach(() => {
    mockReset(prismaClientMock);
  });

  it('should be able to delete a channel', async () => {
    const fakeChannel = genearateFakeChannel();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channelCreated = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    prismaClientMock.channel.delete.mockResolvedValue(channelCreated);

    await deleteChannelService.execute(channelCreated.id);

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.channel.delete).toHaveBeenCalledTimes(1);
    expect(channelCreated.id).toMatch(validChannel.id);
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
      deleteChannelService.execute(fakeChannelId),
    ).rejects.toBeInstanceOf(Error);
    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.channel.delete).toHaveBeenCalledTimes(1);
  });
});
