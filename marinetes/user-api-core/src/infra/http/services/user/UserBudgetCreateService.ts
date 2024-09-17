import {
  BudgetRepository,
  ServiceRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import {
  BadRequestError,
  InsuficientFundsError,
  UserNotFoundError,
} from '@marinetesio/errors';
import { Budget } from '@marinetesio/types/model';
import * as fns from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const MAX_SCHEDULE_HOUR = 15;
// const MIN_SCHEDULE_HOUR = 7;

// const HOUR_DELAY_TO_SAME_DAY = 1;

const ACCEPTED_DAYS_FOR_SCHEDULE = 7;

const makeNowDate = (): Date =>
  utcToZonedTime(new Date(), 'America/Porto_Velho');

const makeMaxDate = (now: Date): Date =>
  fns.set(
    fns.add(now, {
      days: ACCEPTED_DAYS_FOR_SCHEDULE,
    }),
    {
      hours: MAX_SCHEDULE_HOUR,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    },
  );

export interface UserBudgetCreateServiceRequest {
  userId: string;
  data: {
    date: string;
    price: number;
    addressId: string;
    services: string[];
  };
}

export type UserBudgetCreateServiceResponse = Budget;

export class UserBudgetCreateService implements Service {
  async execute(
    request: UserBudgetCreateServiceRequest,
  ): Promise<UserBudgetCreateServiceResponse> {
    const {
      userId,
      data: { date, price, addressId, services },
    } = request;

    const user = await UserRepository.findOne({
      where: { id: userId },
      relations: ['addresses', 'wallet'],
    });

    if (!user || !user.wallet) {
      throw new UserNotFoundError();
    }

    if (user.wallet.balance_available < price) {
      throw new InsuficientFundsError();
    }

    const findedAddress = user.addresses.find(
      currentAddress => currentAddress.id === addressId,
    );

    if (!findedAddress) {
      throw new BadRequestError();
    }

    const now = makeNowDate();
    const nowHour = fns.getHours(now);

    const maxAcceptDate = makeMaxDate(now);
    const scheduleDate = new Date(date);

    // Verifica se a data do agendamento inserida é anterior a data atual ou seja, data passada.
    if (fns.isPast(scheduleDate)) {
      throw new BadRequestError();
    }

    // Verifica se a data do agendamento inserida está no período máximo de 7 dias.
    if (fns.isAfter(scheduleDate, maxAcceptDate)) {
      throw new BadRequestError();
    }

    const isSameDay = fns.isSameDay(scheduleDate, now);

    // const scheduleDateHour = fns.getHours(scheduleDate);
    // Adicionando 1 hora pra ser o delay
    // const verifyScheduleDateHour = isSameDay
    //   ? scheduleDateHour + HOUR_DELAY_TO_SAME_DAY
    //   : scheduleDateHour;

    // Verifica se o horário do agendamento está entre 7-15 horas.
    // if (
    //   verifyScheduleDateHour < MIN_SCHEDULE_HOUR ||
    //   verifyScheduleDateHour > MAX_SCHEDULE_HOUR
    // ) {
    //   throw new BadRequestError();
    // }

    // Verifica se o agendamento é no mesmo dia.
    if (isSameDay) {
      // Verifica se o horário máximo aceito para agendamento já passou.
      if (nowHour >= MAX_SCHEDULE_HOUR) {
        throw new BadRequestError();
      }

      // Como o agendamento é no mesmo dia, será cobrado um valor adicional
    }

    const saveServices = await Promise.all(
      services.map(async serviceId => {
        const serviceFounded = await ServiceRepository.findOne({
          where: { id: serviceId },
        });

        if (!serviceFounded) {
          throw new BadRequestError();
        }

        return serviceFounded;
      }),
    );

    const budget = await BudgetRepository.create({
      date: scheduleDate.toISOString(),
      price,
      estimated_time_in_hours: 6,
      user_id: userId,
      address: findedAddress,
      services: saveServices,
    }).save();

    return budget;
  }
}
