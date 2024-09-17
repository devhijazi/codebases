import { DiaristRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristNotFoundError } from '@marinetesio/errors';
import { DiaristTransfer } from '@marinetesio/types/model/model';

export interface GetAllDiaristTransfersServiceRequest {
  diaristId: string;
}

export type GetAllDiaristTransfersServiceResponse = DiaristTransfer[];

export class GetAllDiaristTransfersService {
  async execute(
    request: GetAllDiaristTransfersServiceRequest,
  ): Promise<GetAllDiaristTransfersServiceResponse> {
    const { diaristId } = request;

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
      relations: ['transfers', 'transfers.diarist'],
      order: {
        created_at: 'DESC',
      },
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    return diarist.transfers;
  }
}
