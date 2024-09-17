import { DiaristTransferRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristTransferNotFoundError } from '@marinetesio/errors';
import { DiaristTransfer } from '@marinetesio/types/model/model';

export interface GetDiaristTransferServiceRequest {
  transferId: string;
}

export type GetDiaristTransferServiceResponse = DiaristTransfer;

export class GetDiaristTransferService {
  async execute(
    request: GetDiaristTransferServiceRequest,
  ): Promise<GetDiaristTransferServiceResponse> {
    const { transferId } = request;

    const transfer = await DiaristTransferRepository.findOne({
      where: { id: transferId },
      relations: ['diarist'],
    });

    if (!transfer) {
      throw new DiaristTransferNotFoundError();
    }

    return transfer;
  }
}
