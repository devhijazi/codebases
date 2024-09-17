import { Job } from '@/core/infra/bull/Job';
import { Mail, EmailPayload } from '@/infra/mail';

export class SendMailJob extends Job<EmailPayload> {
  constructor() {
    super('mailer');
  }

  async handle(data: EmailPayload): Promise<void> {
    const { subject, to, template } = data;

    const mail = new Mail();

    try {
      await mail.sendEmail({
        subject,
        to,
        template: {
          name: template.name,
          group: template.group,
          context: template.context,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
