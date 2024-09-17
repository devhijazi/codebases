import { UserPaymentRepository } from '@marinetesio/database/typeorm/mysql';
import { UserPaymentNotFoundError } from '@marinetesio/errors';
import { UserPayment } from '@marinetesio/types/model/model';

export interface GetUserPaymentServiceRequest {
  paymentId: string;
}

export type GetUserPaymentServiceResponse = UserPayment;

export class GetUserPaymentService {
  async execute(
    request: GetUserPaymentServiceRequest,
  ): Promise<GetUserPaymentServiceResponse> {
    const { paymentId } = request;

    const payment = await UserPaymentRepository.findOne({
      where: { id: paymentId },
      relations: ['user'],
    });

    if (!payment) {
      throw new UserPaymentNotFoundError();
    }

    return payment;
  }
}
