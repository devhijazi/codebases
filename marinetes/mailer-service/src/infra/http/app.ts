import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { RouteNotFoundError } from '@marinetesio/errors';
import express from 'express';

import { MailerQueue } from '@/infra/bull/queues/MailerQueue';

import { ErrorMiddleware } from './middlewares/ErrorMiddleware';

const app = express();

app.disable('x-powered-by');

const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath('/bull');

const mailerQueue = new MailerQueue();

createBullBoard({
  queues: [new BullAdapter(mailerQueue.queue)],
  serverAdapter,
});

app.use('/bull', serverAdapter.getRouter());

app.all('*', () => {
  throw new RouteNotFoundError();
});

app.use(ErrorMiddleware.make());

export { app };
