import { RouteNotFoundError } from '@marinetesio/errors';
import cors from 'cors';
import express from 'express';

import { ControllersManager } from '@/core/infra/http/managers/ControllersManager';

import { ErrorMiddleware } from './middlewares/ErrorMiddleware';
import { RequestMiddleware } from './middlewares/RequestMiddleware';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(RequestMiddleware.make());

const controllersManager = new ControllersManager();

app.use(controllersManager.createRouter());

app.all('*', () => {
  throw new RouteNotFoundError();
});

app.use(ErrorMiddleware.make());

export { app };
