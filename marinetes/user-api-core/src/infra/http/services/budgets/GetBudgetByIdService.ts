import { BudgetRepository } from '@marinetesio/database/typeorm/mysql';
import { BadRequestError } from '@marinetesio/errors';
import { Budget } from '@marinetesio/types/model';

export interface GetBudgetByIdServiceRequest {
  budgetId: string;
}

export class GetBudgetByIdService implements Service {
  async execute(request: GetBudgetByIdServiceRequest): Promise<Budget> {
    const { budgetId } = request;

    const budget = await BudgetRepository.findOne({
      where: { id: budgetId },
      relations: ['services'],
    });

    if (!budget) {
      throw new BadRequestError();
    }

    return budget;
  }
}
