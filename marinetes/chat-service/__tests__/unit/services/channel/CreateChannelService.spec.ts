import type { PrismaClient } from '@prisma/client';

import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prismaClient } from '@/prisma/client';
import { CreateChannelService } from '@/services/channel/CreateChannelService';
import { genearateFakeChannel } from '@tests/fakes/channel';
import { validChannel } from '@tests/utils/regex';

jest.mock('@/prisma/client', () => ({
  __esModule: true,
  prismaClient: mockDeep<PrismaClient>(),
}));

describe('CreateChannelService', () => {
  let prismaClientMock: DeepMockProxy<PrismaClient>;

  let createChannelService: CreateChannelService;

  beforeEach(() => {
    prismaClientMock = prismaClient as DeepMockProxy<PrismaClient>;

    createChannelService = new CreateChannelService();
  });

  afterEach(() => {
    mockReset(prismaClientMock);
  });

  it('should be able to create a channel', async () => {
    const fakeChannel = genearateFakeChannel();

    prismaClientMock.channel.create.mockResolvedValue(fakeChannel);

    const channel = await createChannelService.execute({
      userId: fakeChannel.userId,
      diaristId: fakeChannel.diaristId,
    });

    expect(prismaClientMock.channel.create).toHaveBeenCalledTimes(1);
    expect(channel).toMatchObject(validChannel);
  });
});
