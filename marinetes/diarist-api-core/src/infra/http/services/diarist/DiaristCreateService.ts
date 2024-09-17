import type { DiaristCreateData } from '@marinetesio/types/dtos/diarist/api';

import {
  DiaristRepository,
  DiaristStatusRepository,
} from '@marinetesio/database/typeorm/mysql';
import { RegisterFoundError } from '@marinetesio/errors';
import Str from '@supercharge/strings';

import { producer, topics } from '@/infra/kafka';

export class DiaristCreateService implements Service {
  async execute(data: DiaristCreateData): Promise<void> {
    const { email, document, general_register } = data;

    const hasDiarist = await DiaristRepository.createQueryBuilder('diarist')
      .orWhere({ email })
      .orWhere({ document })
      .orWhere({ general_register })
      .select([
        'diarist.id',
        'diarist.email',
        'diarist.document',
        'diarist.general_register',
      ])
      .getOne();

    if (hasDiarist) {
      throw new RegisterFoundError();
    }

    const { full_name } = data;

    const status = await DiaristStatusRepository.create({
      type: 'pending',
      approved: false,
    }).save();

    await DiaristRepository.create({
      ...data,
      password: '',
      full_name: Str(full_name).title().get(),
      accepting_services: false,
      status,
      accepted_services: [],
    }).save();

    const diaristName = Str(full_name)
      .title()
      .trim()
      .words()
      .slice(0, 2)
      .join(' ');

    const emailData = {
      subject: 'Pré-Registro',
      to: `${diaristName} <${email}>`,
      template: {
        name: 'pre-register-created',
        group: 'diarist',
        context: {
          userName: diaristName,
        },
      },
    };

    await producer.send({
      topic: topics.marinetesMailerIssueEmail,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
