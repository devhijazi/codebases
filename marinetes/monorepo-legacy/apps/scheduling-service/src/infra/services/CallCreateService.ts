import { BudgetRepository, UserRepository } from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import { CallRepository } from '@marinetes/firebase';
import type { CallCreateData } from '@marinetes/types/dtos/scheduling-service';

export class CallCreateService implements Service {
  #callRepository = new CallRepository();

  async execute(userId: string, data: CallCreateData): Promise<string> {
    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const { budgetId } = data;

    const hasBudget = await BudgetRepository.findOne(budgetId, {
      select: ['id'],
    });

    if (!hasBudget) {
      throw new RegisterNotFoundError();
    }

    const call = await this.#callRepository.add({
      userId,
      budgetId,
    });

    return call.id;
  }
}
