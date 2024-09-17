import { Channel } from '@prisma/client';

import { prismaClient } from '@/prisma/client';

interface CreateChannelData {
  userId: string;
  diaristId: string;
}

export class CreateChannelService implements Service {
  public async execute(data: CreateChannelData): Promise<Channel> {
    const { userId, diaristId } = data;

    const channel = await prismaClient.channel.create({
      data: {
        status: 'OPEN',
        userId,
        diaristId,
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

    return channel;
  }
}
