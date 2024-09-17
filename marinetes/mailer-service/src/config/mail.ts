import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { environment } from './environment';

export const mailConfig: SMTPTransport.Options = {
  host: environment.smtpHost,
  port: Number(environment.smtpPort),
  secure: environment.smtpSecure === 'true',
  auth: {
    user: environment.smtpUsername,
    pass: environment.smtpPassword,
  },
};

export const credentialsConfig = {
  author: 'Marinetes <noreply@marinetes.com>',
} as const;
