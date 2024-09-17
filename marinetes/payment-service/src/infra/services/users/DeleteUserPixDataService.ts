import { UserPixDataRepository } from '@marinetesio/database/typeorm/mysql';
import { UserPixKeyNotFoundError } from '@marinetesio/errors';

export interface DeleteUserPixDataServiceRequest {
  pixDataId: string;
}

export interface DeleteUserPixDataServiceResponse {
  pixDataId: string;
}

export class DeleteUserPixDataService {
  async execute(
    request: DeleteUserPixDataServiceRequest,
  ): Promise<DeleteUserPixDataServiceResponse> {
    const { pixDataId } = request;

    const pixData = await UserPixDataRepository.findOne({
      where: {
        id: pixDataId,
      },
    });

    if (!pixData) {
      throw new UserPixKeyNotFoundError();
    }

    await UserPixDataRepository.delete(pixData.id);

    return {
      pixDataId: pixData.id,
    };
  }
}
