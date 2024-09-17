import fs from 'fs';

import hbs from 'handlebars';
import { htmlToText } from 'html-to-text';
import { createTransport } from 'nodemailer';
import { Options as SMTPTransportOptions } from 'nodemailer/lib/smtp-transport';

export type SMTPTOptions = SMTPTransportOptions;

export type MailSendConfig = {
  subject: string;
  to: string;
  from?: string;
  templatePath: string;
  context?: Record<string, any>;
  smtpOptions: SMTPTOptions;
};

const mainContext = {
  marinetesCompany: {
    cnpj: '',
    companyTeamName: "Equipe Marinete's",
    address: '',
  },
};

export class MailProvider {
  public async send(config: MailSendConfig): Promise<void> {
    const {
      subject,
      to,
      templatePath,
      smtpOptions,
      context,
      from = 'Marinetes <noreply@marinetes.com>',
    } = config;

    const templateSource = await fs.promises.readFile(templatePath, 'utf-8');

    const transporter = createTransport(smtpOptions);
    const template = hbs.compile(templateSource);

    const templateContext = {
      ...(context || {}),
      ...mainContext,
    };

    const html = template(templateContext);
    const text = htmlToText(html);

    try {
      await transporter.sendMail({
        subject,
        to,
        from,
        text,
        html,
      });
    } catch {
      //
    } finally {
      transporter.close();
    }
  }
}
