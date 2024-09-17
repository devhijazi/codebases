import {
  BudgetRepository,
  UserRepository,
  DiaristRepository,
  ScheduleRepository,
} from '@marinetes/database';
import {
  RegisterNotFoundError,
  BadRequestError,
  CallNotExistsError,
  ForbiddenError,
} from '@marinetes/errors';
import { CallRepository } from '@marinetes/firebase';
import type {
  ScheduleCreateData,
  ScheduleCreatedDocument,
} from '@marinetes/types/dtos/user/api';
import * as fns from 'date-fns';

const MAX_AWAIT_TIME_IN_MINUTES = 10;

export class UserScheduleCreateService implements Service {
  #callRepository = new CallRepository();

  async execute(
    userId: string,
    data: ScheduleCreateData,
  ): Promise<ScheduleCreatedDocument> {
    const user = await UserRepository.findOne(userId, {
      select: ['id'],
    });

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const { call: callId } = data;

    const call = await this.#callRepository.getDocument(callId);

    if (!call.exists) {
      throw new CallNotExistsError();
    }

    const callData = call.data();

    if (!callData) {
      throw new CallNotExistsError();
    }

    const { acceptedDiaristId, budgetId, userId: callUserId } = callData;

    if (!acceptedDiaristId) {
      throw new BadRequestError();
    }

    if (callUserId !== user.id) {
      throw new ForbiddenError();
    }

    const deleteBudget = (): Promise<any> => BudgetRepository.delete(budgetId);

    const budget = await BudgetRepository.createQueryBuilder('budget')
      .where({ id: budgetId })
      .innerJoinAndSelect('budget.address', 'address')
      .leftJoinAndSelect('budget.services', 'service')
      .select([
        'id',
        'date',
        'price',
        'estimated_time_in_hours',
        'service.id',
        'address.title',
        'address.type',
        'address.category',
        'address.rooms',
        'address.square_meters',
        'address.zip_code',
        'address.state',
        'address.city',
        'address.neighborhood',
        'address.street',
        'address.number',
      ])
      .getOne();

    if (!budget) {
      throw new BadRequestError();
    }

    const budgetCreatedDate = fns.parseISO(budget.date);

    // Verifica se a data do agendamento já passou
    if (fns.isPast(budgetCreatedDate)) {
      await deleteBudget();

      throw new BadRequestError();
    }

    const now = new Date();

    // Verifica se a criação do orçamento tem mais de 10 minutos
    if (
      fns.isAfter(
        now,
        fns.add(budgetCreatedDate, {
          minutes: MAX_AWAIT_TIME_IN_MINUTES,
        }),
      )
    ) {
      await deleteBudget();

      throw new BadRequestError();
    }

    const diarist = await DiaristRepository.findOne(acceptedDiaristId, {
      select: ['id'],
    });

    if (!diarist) {
      await deleteBudget();

      throw new BadRequestError();
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

    await deleteBudget();

    return {
      id: schedule.id,
    };
  }
}
