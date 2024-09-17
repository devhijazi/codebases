import { resolve } from 'node:path';

import { Logger } from '@marinetesio/logger';
import { Service } from '@marinetesio/types/model/model';
import { config } from 'dotenv';

import { connect } from '../connection';
import { ServiceRepository } from '../models';

const typeormFolderPath = resolve(__dirname, '..');
const envPath = resolve(typeormFolderPath, '.env');

config({ path: envPath });

async function main(): Promise<void> {
  const logger = new Logger('CreateServicesSeed');

  await connect({
    host: process.env.MYSQL_HOST as string,
    port: Number(process.env.MYSQL_PORT as string),
    database: process.env.MYSQL_DATABASE as string,
    password: process.env.MYSQL_PASSWORD as string,
    username: process.env.MYSQL_USERNAME as string,
  });

  const services: Pick<Service, 'icon' | 'title'>[] = [
    {
      title: 'cleaning', // Faxina
      icon: 'maps-cleaning-services',
    },
    {
      title: 'cook', // Cozinhar
      icon: 'household-cleaning-services',
    },
    {
      title: 'wash-clothes', // Lavar roupa
      icon: 'maps-local-laundry-service',
    },
  ];

  await Promise.all(
    services.map(async service => {
      const serviceAlreadyExists = await ServiceRepository.findOne({
        where: { title: service.title },
      });

      if (!serviceAlreadyExists) {
        await ServiceRepository.create({
          title: service.title,
          icon: service.icon,
        }).save();

        logger.success(
          `Creating the "${service.title} (${service.icon})" service.`,
        );
      } else {
        logger.info(
          `Skipping the creation of the "${service.title} (${service.icon})" service.`,
        );
      }
    }),
  );
}

main();
