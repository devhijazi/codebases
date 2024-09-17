import type { Message } from '@prisma/client';

import { prismaClient } from '@/prisma/client';

export class ListMessagesService implements Service {
  public async execute(channelId: string): Promise<Message[]> {
    const messages = await prismaClient.message.findMany({
      where: {
        channelId,
      },
      select: {
        id: true,
        content: true,
        channelId: true,
        authorId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return messages;
  }
}
