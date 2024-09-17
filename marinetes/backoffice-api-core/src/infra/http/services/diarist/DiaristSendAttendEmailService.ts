import {
  DiaristRepository,
  DiaristStatusRepository,
} from '@marinetesio/database/typeorm/mysql';
import { RegisterNotFoundError } from '@marinetesio/errors';
import Str from '@supercharge/strings';

import { producer, topics } from '@/infra/kafka';

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
        name: 'diarist-complete-register',
        group: 'dashboard',
        context: {
          firstName: diaristNameArray[0],
        },
      },
    };

    await producer.send({
      topic: topics.marinetesMailerIssueEmail,
      messages: [{ value: JSON.stringify(emailData) }],
    });
  }
}
