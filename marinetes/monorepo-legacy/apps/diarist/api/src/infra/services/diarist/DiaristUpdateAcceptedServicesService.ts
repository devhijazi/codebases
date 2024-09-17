import { DiaristRepository, ServiceRepository } from '@marinetes/database';
import { BadRequestError, RegisterNotFoundError } from '@marinetes/errors';
import type { DiaristUpdateAcceptedServicesData } from '@marinetes/types/dtos/diarist/api';

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
