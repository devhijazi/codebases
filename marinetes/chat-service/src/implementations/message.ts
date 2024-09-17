import type {
  RpcInputStream,
  ServerCallContext,
} from '@protobuf-ts/runtime-rpc';

import { adaptService } from '@protobuf-ts/grpc-backend';
import PubSub from 'pubsub-js';

import { CreateMessageService } from '@/services/message/CreateMessageService';
import { GetMessageService } from '@/services/message/GetMessageService';
import { ListMessagesService } from '@/services/message/ListMessagesService';
import {
  MessageService,
  CreateMessageRequest,
  CreateMessageResponse,
  ListMessagesRequest,
  ListMessagesResponse,
  ReceiveMessageRequest,
  ReceiveMessageResponse,
} from '@protos/generated/message';
import { IMessageService as IMessageImplementation } from '@protos/generated/message.server';

const messageDataTopic = 'MESSAGE_DATA';

class MessageImplementation implements IMessageImplementation {
  public async createMessage(
    request: CreateMessageRequest,
  ): Promise<CreateMessageResponse> {
    const { content, channelId, authorId } = request;

    const createMessage = new CreateMessageService();
    const message = await createMessage.execute({
      content,
      channelId,
      authorId,
    });

    PubSub.publish(messageDataTopic, {
      messageId: message.id,
      channelId: message.channelId,
    });

    return CreateMessageResponse.create(<any>{ message });
  }

  public async listMessages(
    request: ListMessagesRequest,
    _context: ServerCallContext,
  ): Promise<ListMessagesResponse> {
    const { channelId } = request;

    const listMessages = new ListMessagesService();
    const messages = await listMessages.execute(channelId);

    return ListMessagesResponse.create(<any>{ messages });
  }

  public async receiveMessage(
    request: ReceiveMessageRequest,
    responses: RpcInputStream<ReceiveMessageResponse>,
    context: ServerCallContext,
  ): Promise<void> {
    const { channelId } = request;

    const subscriber = async (
      _topic: string,
      payload: Record<'messageId', string>,
    ): Promise<void> => {
      const { messageId } = payload;

      const getMessage = new GetMessageService();
      const message = await getMessage.execute({
        messageId,
        channelId,
      });

      if (!message) return;

      responses.send(<any>{ message });
    };

    PubSub.subscribe(messageDataTopic, subscriber);

    await new Promise(resolve => {
      context.onCancel(<any>resolve);
    });
  }
}

export const message = adaptService(
  MessageService,
  new MessageImplementation(),
);
