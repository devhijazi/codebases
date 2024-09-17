import type { DiaristUpdateAcceptedServicesData } from '@marinetesio/types/dtos/diarist/api';

import {
  DiaristRepository,
  ServiceRepository,
} from '@marinetesio/database/typeorm/mysql';
import { BadRequestError, RegisterNotFoundError } from '@marinetesio/errors';

export class DiaristUpdateAcceptedServicesService implements Service {
  async execute(
    diaristId: string,
    data: DiaristUpdateAcceptedServicesData,
  ): Promise<void> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .leftJoinAndSelect('diarist.accepted_services', 'accepted_services')
      .select(['diarist.id', 'accepted_services'])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    const { accepted_services: newServices } = data;

    const services = await Promise.all(
      newServices
        .filter((serviceId, index, array) => array.indexOf(serviceId) === index)
        .map(async serviceId => {
          const service = await ServiceRepository.findOne(serviceId, {
            select: ['id'],
          });

          if (!service) {
            throw new BadRequestError();
          }

          return service;
        }),
    );

    diarist.accepted_services = services;

    await diarist.save();
  }
}
