import { prismaClient } from '@/prisma/client';

export class DeleteChannelService implements Service {
  public async execute(channelId: string): Promise<void> {
    const channel = await prismaClient.channel.delete({
      where: {
        id: channelId,
      },
    });

    if (!channel) {
      throw new Error('Channel not found.');
    }
  }
}
