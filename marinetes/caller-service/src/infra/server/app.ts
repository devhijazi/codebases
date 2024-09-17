import { RouteNotFoundError } from '@marinetesio/errors';
import cors from 'cors';
import express from 'express';

import { QueueController } from './controllers/QueueController';
import { ScheduleController } from './controllers/ScheduleController';
import { SolicitationController } from './controllers/SolicitationController';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';
import { RequestManagerMiddleware } from './middlewares/RequestManagerMiddleware';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(RequestManagerMiddleware.make());

app.use(QueueController.make());
app.use(SolicitationController.make());
app.use(ScheduleController.make());

app.all('*', () => {
  throw new RouteNotFoundError();
});

app.use(ErrorMiddleware.make());

export { app };
