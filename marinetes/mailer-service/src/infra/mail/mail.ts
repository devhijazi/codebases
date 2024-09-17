import hbs from 'handlebars';
import { htmlToText } from 'html-to-text';
import { createTransport } from 'nodemailer';

import { mailConfig, credentialsConfig } from '@/config/mail';
import { getTemplateSourceByName } from '@/utils/getTemplateSourceByName';

export interface EmailPayload {
  subject: string;
  to: string;
  template: {
    name: string;
    group: string;
    context?: Record<string, any>;
  };
}

export class Mail {
  async sendEmail(payload: EmailPayload): Promise<void> {
    const { subject, to, template } = payload;

    const transporter = createTransport(mailConfig);

    const templateSource = await getTemplateSourceByName(
      template.name,
      template.group,
    );

    const getTemplate = hbs.compile(templateSource);

    const html = getTemplate(template.context ?? {});
    const text = htmlToText(html);

    try {
      await transporter.sendMail({
        subject,
        to,
        from: credentialsConfig.author,
        text,
        html,
      });
    } catch (error) {
      console.log(error);
    } finally {
      transporter.close();
    }
  }
}
