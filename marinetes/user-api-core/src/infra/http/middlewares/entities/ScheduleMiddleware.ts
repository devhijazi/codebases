import { ScheduleRepository } from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import { Request, Response, NextFunction } from 'express';

import {
  MiddlewareBase,
  buildMiddleware,
} from '@/core/infra/http/bases/MiddlewareBase';

class Middleware extends MiddlewareBase {
  async execute(
    { manager, params: { scheduleId } }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const schedule = await ScheduleRepository.findOne(scheduleId, {
      select: ['id'],
    });

    if (!schedule) {
      throw new RegisterNotFoundError();
    }

    manager.setSchedule(schedule);
    next();
  }
}

export const ScheduleMiddleware = buildMiddleware(Middleware);
