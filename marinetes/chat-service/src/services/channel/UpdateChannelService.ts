import { Channel, ChannelStatus } from '@prisma/client';

import { prismaClient } from '@/prisma/client';

interface UpdateChannelData {
  status: ChannelStatus;
}

export class UpdateChannelService implements Service {
  public async execute(
    channelId: string,
    data: UpdateChannelData,
  ): Promise<Channel> {
    const { status } = data;

    const channel = await prismaClient.channel.update({
      where: {
        id: channelId,
      },
      data: {
        status,
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
