import type { Channel } from '@prisma/client';

import { prismaClient } from '@/prisma/client';

export class GetChannelService implements Service {
  public async execute(channelId: string): Promise<Channel> {
    const channel = await prismaClient.channel.findFirst({
      where: {
        id: channelId,
      },
      select: {
        id: true,
        status: true,
        userId: true,
        diaristId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!channel) {
      throw new Error('Channel not found.');
    }

    return channel;
  }
}
