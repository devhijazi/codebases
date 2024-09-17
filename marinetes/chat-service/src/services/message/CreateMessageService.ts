import type { Message } from '@prisma/client';

import { prismaClient } from '@/prisma/client';

interface CreateMessageData {
  content: string;
  authorId: string;
  channelId: string;
}

export class CreateMessageService implements Service {
  public async execute(data: CreateMessageData): Promise<Message> {
    const { content, channelId, authorId } = data;

    const message = await prismaClient.message.create({
      data: {
        content,
        channelId,
        authorId,
        status: 'NOT_READ',
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

    return message;
  }
}
