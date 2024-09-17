import { Logger } from '@marinetesio/logger';
import Bull from 'bull';

import { queueOptions } from '@/config/bull';

import { SendMailJob } from '../jobs/SendMailJob';

export class MailerQueue {
  name: string;

  queue: Bull.Queue;

  #logger: Logger;

  constructor() {
    this.name = 'MailQueue';

    this.queue = new Bull(this.name, queueOptions);
    this.#logger = new Logger(this.name);
  }

  async add(data: unknown): Promise<void> {
    await this.queue.add(data, {
      attempts: 5,
      removeOnComplete: true,
      removeOnFail: true,
      delay: 500,
    });
  }

  async process(): Promise<void> {
    this.queue.on('active', (_job, _jobPromise) => {
      this.#logger.debug('Starting job of sending email...');
    });

    this.queue.on('error', error => {
      console.error(error);
    });

    this.queue.on('failed', error => {
      console.error(error);
    });

    this.queue.on('completed', (_job, _result) => {
      this.#logger.success('Job sending email finished and successfully!');
    });

    await this.queue.process(async ({ data }) => {
      const sendMailJob = new SendMailJob();

      await sendMailJob.handle(data);
    });
  }
}
