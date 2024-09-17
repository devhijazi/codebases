import { UserRepository } from '@marinetesio/database/typeorm/mysql';
import { UserNotFoundError } from '@marinetesio/errors';
import { UserPixData } from '@marinetesio/types/model/model';

export interface GetAllUserPixDataServiceRequest {
  userId: string;
}

export type GetAllUserPixDataServiceResponse = UserPixData[];

export class GetAllUserPixDataService {
  async execute(
    request: GetAllUserPixDataServiceRequest,
  ): Promise<GetAllUserPixDataServiceResponse> {
    const { userId } = request;

    const user = await UserRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['pixes'],
      order: {
        created_at: 'DESC',
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user.pixes;
  }
}
