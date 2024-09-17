import {
  BudgetRepository,
  DiaristRepository,
  ScheduleRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  BudgetNotFoundError,
  DiaristNotFoundError,
  UserNotFoundError,
} from '@marinetesio/errors';
import { Schedule } from '@marinetesio/types/model';

import { Service } from '@/core/infra/Service';

export interface CreateScheduleServiceRequest {
  userId: string;
  diaristId: string;
  budgetId: string;
}

export class CreateScheduleService implements Service {
  async execute(request: CreateScheduleServiceRequest): Promise<Schedule> {
    const { userId, diaristId, budgetId } = request;

    const user = await UserRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const diarist = await DiaristRepository.findOne({
      where: { id: diaristId },
    });

    if (!diarist) {
      throw new DiaristNotFoundError();
    }

    const budget = await BudgetRepository.findOne({
      where: { id: budgetId },
      relations: ['services'],
    });

    if (!budget) {
      throw new BudgetNotFoundError();
    }

    const schedule = await ScheduleRepository.create({
      date: budget.date,
      price: budget.price,
      user_id: user.id,
      diarist_id: diarist.id,
      estimated_time_in_hours: budget.estimated_time_in_hours,
      verification_code: '',
      confirmation_code: '',
      verified: false,
      confirmed: false,
      going_to_local: false,
      status: 'pending',
      address: budget.address,
      payment: {},
      services: budget.services,
    }).save();

    return schedule;
  }
}
