import { UserTransferRepository } from '@marinetesio/database/typeorm/mysql';
import { UserTransferNotFoundError } from '@marinetesio/errors';
import { UserTransfer } from '@marinetesio/types/model/model';

export interface GetUserTransferServiceRequest {
  transferId: string;
}

export type GetUserTransferServiceResponse = UserTransfer;

export class GetUserTransferService {
  async execute(
    request: GetUserTransferServiceRequest,
  ): Promise<GetUserTransferServiceResponse> {
    const { transferId } = request;

    const transfer = await UserTransferRepository.findOne({
      where: { id: transferId },
      relations: ['user'],
    });

    if (!transfer) {
      throw new UserTransferNotFoundError();
    }

    return transfer;
  }
}
