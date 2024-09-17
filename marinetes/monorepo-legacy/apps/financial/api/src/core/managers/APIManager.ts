import { RouteNotFoundError } from '@marinetes/errors';
import cors from 'cors';
import express from 'express';

import { app } from '@/app';
import { consumer, producer } from '@/infra/kafka/client';
import { ErrorMiddleware } from '@http/middlewares/ErrorMiddleware';
import { RequestMiddleware } from '@http/middlewares/RequestMiddleware';
import { getRootPath } from '@utils/path';

import { ControllersManager } from './ControllersManager';

const { PORT, NODE_ENV } = process.env;

export class APIManager {
  public async connect(): Promise<void> {
    await producer.connect();
    await consumer.connect();

    app.use(cors());
    app.use(RequestMiddleware.make());

    const controllersManager = new ControllersManager();

    app.use(controllersManager.createRouter());

    if (NODE_ENV === 'development') {
      app.use('/files', express.static(getRootPath('.tmp/files')));
    }

    app.all('*', () => {
      throw new RouteNotFoundError();
    });

    app.use(ErrorMiddleware.make());

    app.listen(PORT, () => {
      console.log(`Server is running on port "${PORT}"`); // eslint-disable-line no-console
    });
  }
}
