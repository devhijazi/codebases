import { UserPixDataRepository } from '@marinetesio/database/typeorm/mysql';
import { UserPixKeyNotFoundError } from '@marinetesio/errors';
import { UserPixData } from '@marinetesio/types/model/model';

export interface GetUserPixDataServiceRequest {
  pixDataId: string;
}

export type GetUserPixDataServiceResponse = UserPixData;

export class GetUserPixDataService {
  async execute(
    request: GetUserPixDataServiceRequest,
  ): Promise<GetUserPixDataServiceResponse> {
    const { pixDataId } = request;

    const pixData = await UserPixDataRepository.findOne({
      where: {
        id: pixDataId,
      },
    });

    if (!pixData) {
      throw new UserPixKeyNotFoundError();
    }

    return pixData;
  }
}
