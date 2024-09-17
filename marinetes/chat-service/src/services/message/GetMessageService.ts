import type { Message } from '@prisma/client';

import { prismaClient } from '@/prisma/client';

interface GetMessageData {
  messageId: string;
  channelId: string;
}

export class GetMessageService implements Service {
  public async execute(data: GetMessageData): Promise<Message | null> {
    const { messageId, channelId } = data;

    const message = await prismaClient.message.findFirst({
      where: {
        id: messageId,
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

    if (!message) {
      return null;
    }

    return message;
  }
}
