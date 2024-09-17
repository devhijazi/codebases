import { RouteNotFoundError } from '@marinetes/errors';
import cors from 'cors';

import { app } from '@/app';
import { ErrorMiddleware } from '@http/middlewares/ErrorMiddleware';
import { RequestMiddleware } from '@http/middlewares/RequestMiddleware';

import { ControllersManager } from './ControllersManager';

export class APIManager {
  public connect(): void {
    const { PORT } = process.env;

    const controllersManager = new ControllersManager();

    app.use(cors());
    app.use(RequestMiddleware.make());

    app.use(controllersManager.createRouter());

    app.all('*', () => {
      throw new RouteNotFoundError();
    });

    app.use(ErrorMiddleware.make());

    app.listen(PORT, () => {
      console.log(`Server is running on port "${PORT}"`); // eslint-disable-line no-console
    });
  }
}
