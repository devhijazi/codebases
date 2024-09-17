import { BudgetRepository } from '@marinetesio/database/typeorm/mysql';
import { BadRequestError } from '@marinetesio/errors';
import { Budget } from '@marinetesio/types/model';

export interface GetAllBudgetByUserIdServiceRequest {
  userId: string;
}

export class GetAllBudgetByUserIdService implements Service {
  async execute(
    request: GetAllBudgetByUserIdServiceRequest,
  ): Promise<Budget[]> {
    const { userId } = request;

    const budget = await BudgetRepository.find({
      where: { user_id: userId },
      relations: ['services'],
      order: {
        created_timestamp: 'DESC',
      },
    });

    if (!budget) {
      throw new BadRequestError();
    }

    return budget;
  }
}
