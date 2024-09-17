import { UserRepository } from '@marinetesio/database/typeorm/mysql';
import { UserNotFoundError } from '@marinetesio/errors';
import { UserPayment } from '@marinetesio/types/model/model';

export interface GetAllUserPaymentsServiceRequest {
  userId: string;
}

export type GetAllUserPaymentsServiceResponse = UserPayment[];

export class GetAllUserPaymentsService {
  async execute(
    request: GetAllUserPaymentsServiceRequest,
  ): Promise<GetAllUserPaymentsServiceResponse> {
    const { userId } = request;

    const user = await UserRepository.findOne({
      where: { id: userId },
      relations: ['payments', 'payments.user'],
      order: {
        created_at: 'DESC',
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user.payments;
  }
}
