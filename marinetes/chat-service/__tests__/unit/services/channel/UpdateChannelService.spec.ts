import type { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prismaClient } from '@/prisma/client';
import { CreateChannelService } from '@/services/channel/CreateChannelService';
import { UpdateChannelService } from '@/services/channel/UpdateChannelService';
import { genearateFakeChannel } from '@tests/fakes/channel';

jest.mock('@/prisma/client', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

describe('UpdateChannelService', () => {
  let prismaClientMock: DeepMockProxy<PrismaClient>;

  let createChannelService: CreateChannelService;
  let updateChannelService: UpdateChannelService;

  beforeEach(() => {
    prismaClientMock = prismaClient as DeepMockProxy<PrismaClient>;

    createChannelService = new CreateChannelService();
    updateChannelService = new UpdateChannelService();
  });

  afterEach(() => {
    mockReset(prismaClientMock);
  });

  it('should be able to change channel status to OPEN', async () => {
    const fakeChannel = genearateFakeChannel();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channelCreated = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    channelCreated.status = 'OPEN';

    prismaClientMock.channel.update.mockResolvedValue(channelCreated);

    const channelUpdated = await updateChannelService.execute(
      channelCreated.id,
      {
        status: 'OPEN',
      },
    );

    expect(channelUpdated.status).toBe('OPEN');
    expect(channelUpdated.status).toMatch(channelUpdated.status);
    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.channel.update).toHaveBeenCalledTimes(1);
  });

  it('should be able to change channel status to CLOSED', async () => {
    const fakeChannel = genearateFakeChannel();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channelCreated = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    channelCreated.status = 'CLOSED';

    prismaClientMock.channel.update.mockResolvedValue(channelCreated);

    const channelUpdated = await updateChannelService.execute(
      channelCreated.id,
      {
        status: 'CLOSED',
      },
    );

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.channel.update).toHaveBeenCalledTimes(1);
    expect(channelUpdated.status).toBe('CLOSED');
    expect(channelUpdated.status).toMatch(channelUpdated.status);
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
      updateChannelService.execute(fakeChannelId, {
        status: 'OPEN',
      }),
    ).rejects.toBeInstanceOf(Error);
    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(prismaClientMock.channel.update).toHaveBeenCalledTimes(1);
  });
});
