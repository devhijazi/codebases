import { BudgetRepository, UserRepository } from '@marinetes/database';
import { RegisterNotFoundError, BadRequestError } from '@marinetes/errors';
import type {
  BudgetCreateData,
  BudgetDocument,
} from '@marinetes/types/dtos/user/api';
import { instanceToPlain } from 'class-transformer';
import * as fns from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const MAX_SCHEDULE_HOUR = 15;
const MIN_SCHEDULE_HOUR = 7;

const HOUR_DELAY_TO_SAME_DAY = 1;

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

export class UserBudgetCreateService implements Service {
  async execute(
    userId: string,
    data: BudgetCreateData,
  ): Promise<BudgetDocument> {
    const user = await UserRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.addresses', 'address')
      .where({ id: userId })
      .select([
        'user.id',
        'address.id',
        'address.type',
        'address.category',
        'address.zip_code',
        'address.state',
        'address.city',
        'address.neighborhood',
        'address.street',
        'address.number',
      ])
      .getOne();

    if (!user) {
      throw new RegisterNotFoundError();
    }

    const { address: addressId } = data;

    const findedAddress = user.addresses.find(
      currentAddress => currentAddress.id === addressId,
    );

    if (!findedAddress) {
      throw new BadRequestError();
    }

    const now = makeNowDate();
    const nowHour = fns.getHours(now);

    const maxAcceptDate = makeMaxDate(now);
    const scheduleDate = new Date(data.date);

    // Verifica se a data do agendamento inserida é anterior a data atual ou seja, data passada.
    if (fns.isPast(scheduleDate)) {
      throw new BadRequestError();
    }

    // Verifica se a data do agendamento inserida está no período máximo de 7 dias.
    if (fns.isAfter(scheduleDate, maxAcceptDate)) {
      throw new BadRequestError();
    }

    const isSameDay = fns.isSameDay(scheduleDate, now);

    const scheduleDateHour = fns.getHours(scheduleDate);
    // Adicionando 1 hora pra ser o delay
    const verifyScheduleDateHour = isSameDay
      ? scheduleDateHour + HOUR_DELAY_TO_SAME_DAY
      : scheduleDateHour;

    // Verifica se o horário do agendamento está entre 7-15 horas.
    if (
      verifyScheduleDateHour < MIN_SCHEDULE_HOUR ||
      verifyScheduleDateHour > MAX_SCHEDULE_HOUR
    ) {
      throw new BadRequestError();
    }

    // Verifica se o agendamento é no mesmo dia.
    if (isSameDay) {
      // Verifica se o horário máximo aceito para agendamento já passou.
      if (nowHour >= MAX_SCHEDULE_HOUR) {
        throw new BadRequestError();
      }

      // Como o agendamento é no mesmo dia, será cobrado um valor adicional
    }

    const saveAddress = { ...findedAddress, id: undefined };

    const budget = await BudgetRepository.create({
      date: scheduleDate.toISOString(),
      price: 120,
      estimated_time_in_hours: 6,
      user_id: userId,
      address: saveAddress,
    }).save();

    return instanceToPlain(budget) as BudgetDocument;
  }
}
