import { UserRepository } from '@marinetesio/database/typeorm/mysql';
import { UserNotFoundError } from '@marinetesio/errors';
import { UserTransfer } from '@marinetesio/types/model/model';

export interface GetAllUserTransfersServiceRequest {
  userId: string;
}

export type GetAllUserTransfersServiceResponse = UserTransfer[];

export class GetAllUserTransfersService {
  async execute(
    request: GetAllUserTransfersServiceRequest,
  ): Promise<GetAllUserTransfersServiceResponse> {
    const { userId } = request;

    const user = await UserRepository.findOne({
      where: { id: userId },
      relations: ['transfers', 'transfers.user'],
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user.transfers;
  }
}
