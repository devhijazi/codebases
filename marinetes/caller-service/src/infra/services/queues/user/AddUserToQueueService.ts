import {
  BudgetRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  BadRequestError,
  BudgetNotFoundError,
  UserNotFoundError,
} from '@marinetesio/errors';

import { Service } from '@/core/infra/Service';
import { userQueue } from '@/infra/queue/queues/UserQueue';

export interface AddUserToQueueServiceRequest {
  userId: string;
  budgetId: string;
}

export class AddUserToQueueService implements Service {
  async execute(request: AddUserToQueueServiceRequest): Promise<void> {
    const { userId, budgetId } = request;

    const userQueueJobs = await userQueue.getJobs();

    const userHasAlreadyJoined = userQueueJobs.some(
      ({ data: jobData }) => jobData.userId === userId,
    );

    if (userHasAlreadyJoined) {
      throw new BadRequestError();
    }

    const user = await UserRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const budget = await BudgetRepository.findOne({
      where: { id: budgetId },
    });

    if (!budget) {
      throw new BudgetNotFoundError();
    }

    await userQueue.add('user', {
      userId,
      budgetId: budget.id,
      accpetedMatching: false,
      relatedDiaristId: null,
    });
  }
}
