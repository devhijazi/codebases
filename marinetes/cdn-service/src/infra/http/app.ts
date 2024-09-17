import { RouteNotFoundError } from '@hitechline/marinetes-errors';
import cors from 'cors';
import express from 'express';

import { ImageController } from './controllers/ImageController';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';
import { RequestManagerMiddleware } from './middlewares/RequestManagerMiddleware';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(RequestManagerMiddleware.make());

app.use(ImageController.make());

app.all('*', () => {
  throw new RouteNotFoundError();
});

app.use(ErrorMiddleware.make());

export { app };
