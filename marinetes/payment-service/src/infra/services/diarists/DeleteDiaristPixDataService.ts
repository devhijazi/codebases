import { DiaristPixDataRepository } from '@marinetesio/database/typeorm/mysql';
import { DiaristPixKeyNotFoundError } from '@marinetesio/errors';

export interface DeleteDiaristPixDataServiceRequest {
  pixDataId: string;
}

export interface DeleteDiaristPixDataServiceResponse {
  pixDataId: string;
}

export class DeleteDiaristPixDataService {
  async execute(
    request: DeleteDiaristPixDataServiceRequest,
  ): Promise<DeleteDiaristPixDataServiceResponse> {
    const { pixDataId } = request;

    const pixData = await DiaristPixDataRepository.findOne({
      where: {
        id: pixDataId,
      },
    });

    if (!pixData) {
      throw new DiaristPixKeyNotFoundError();
    }

    await DiaristPixDataRepository.delete(pixData.id);

    return {
      pixDataId: pixData.id,
    };
  }
}
