import type { Channel } from '@prisma/client';

import { prismaClient } from '@/prisma/client';

export class ListChannelsService implements Service {
  public async execute(): Promise<Channel[]> {
    const channels = await prismaClient.channel.findMany({
      select: {
        id: true,
        status: true,
        userId: true,
        diaristId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return channels;
  }
}
