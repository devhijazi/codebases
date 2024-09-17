import {
  DiaristRepository,
  DiaristStatusRepository,
} from '@marinetes/database';
import { RegisterNotFoundError } from '@marinetes/errors';
import Str from '@supercharge/strings';

import { producer } from '@/infra/kafka/client';

export class DiaristSendAttendEmailService implements Service {
  async execute(diaristId: string): Promise<void> {
    const diarist = await DiaristRepository.createQueryBuilder('diarist')
      .where({ id: diaristId })
      .innerJoinAndSelect('diarist.status', 'status')
      .select(['diarist.id', 'diarist.full_name', 'diarist.email', 'status.id'])
      .getOne();

    if (!diarist) {
      throw new RegisterNotFoundError();
    }

    await DiaristStatusRepository.update(diarist.status.id, {
      last_attend_email_sent_date: new Date() as any,
    });

    const diaristNameArray = Str(diarist.full_name)
      .title()
      .trim()
      .words()
      .slice(0, 2);

    const emailData = {
      subject: 'Complete seu registro!',
      to: `${diaristNameArray.join(' ')} <${diarist.email}>`,
      template: {
        name: 'diarist_complete_register',
        group: 'financial',
        context: {
          firstName: diaristNameArray[0],
        },
      },
    };

    await producer.send({
      topic: process.env.KAFKA_TOPIC_ISSUE_EMAIL,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
