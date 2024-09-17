import type { ServerCallContext } from '@protobuf-ts/runtime-rpc';

import { adaptService } from '@protobuf-ts/grpc-backend';

import { CreateChannelService } from '@/services/channel/CreateChannelService';
import { DeleteChannelService } from '@/services/channel/DeleteChannelService';
import { GetChannelService } from '@/services/channel/GetChannelService';
import { ListChannelsService } from '@/services/channel/ListChannelsService';
import { UpdateChannelService } from '@/services/channel/UpdateChannelService';
import {
  ChannelService,
  CreateChannelRequest,
  CreateChannelResponse,
  ListChannelsRequest,
  ListChannelsResponse,
  ChannelInfoRequest,
  ChannelInfoResponse,
  DeleteChannelRequest,
  DeleteChannelResponse,
  UpdateChannelRequest,
  UpdateChannelResponse,
} from '@protos/generated/channel';
import { IChannelService as IChannelImplementation } from '@protos/generated/channel.server';

class ChannelImplementation implements IChannelImplementation {
  public async createChannel(
    request: CreateChannelRequest,
    _context: ServerCallContext,
  ): Promise<CreateChannelResponse> {
    const { userId, diaristId } = request;

    const createChannel = new CreateChannelService();
    const channel = await createChannel.execute({
      userId,
      diaristId,
    });

    return CreateChannelResponse.create(<any>{ channel });
  }

  public async listChannels(
    _request: ListChannelsRequest,
    _context: ServerCallContext,
  ): Promise<ListChannelsResponse> {
    const listChannels = new ListChannelsService();
    const channels = await listChannels.execute();

    return ListChannelsResponse.create(<any>{ channels });
  }

  public async channelInfo(
    request: ChannelInfoRequest,
    _context: ServerCallContext,
  ): Promise<ChannelInfoResponse> {
    const { channelId } = request;

    const getChannel = new GetChannelService();
    const channel = await getChannel.execute(channelId);

    return ChannelInfoResponse.create(<any>{ channel });
  }

  public async updateChannel(
    request: UpdateChannelRequest,
    _context: ServerCallContext,
  ): Promise<UpdateChannelResponse> {
    const { channelId, status } = request;

    const updateChannel = new UpdateChannelService();
    const channel = await updateChannel.execute(channelId, <any>{
      status,
    });

    return UpdateChannelResponse.create(<any>{ channel });
  }

  public async deleteChannel(
    request: DeleteChannelRequest,
    _context: ServerCallContext,
  ): Promise<DeleteChannelResponse> {
    const { channelId } = request;

    const deleteChannel = new DeleteChannelService();

    await deleteChannel.execute(channelId);

    return DeleteChannelResponse.create({});
  }
}

export const channel = adaptService(
  ChannelService,
  new ChannelImplementation(),
);
