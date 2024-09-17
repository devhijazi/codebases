import {
  DiaristRepository,
  DiaristStatusRepository,
} from '@marinetes/database';
import { RegisterFoundError } from '@marinetes/errors';
import type { DiaristCreateData } from '@marinetes/types/dtos/diarist/api';
import Str from '@supercharge/strings';

import { producer } from '@/infra/kafka/client';

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
      topic: process.env.KAFKA_TOPIC_ISSUE_EMAIL,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
