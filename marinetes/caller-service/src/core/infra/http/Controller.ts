import { Router } from 'express';

import { Middleware } from './Middleware';

export type ControllerMiddlewares = Middleware['execute'][];

export abstract class Controller {
  readonly #baseUrl: string;

  readonly #middlewares: ControllerMiddlewares;

  protected abstract execute(router: Router): void;

  constructor(baseUrl: string, middlewares: ControllerMiddlewares = []) {
    this.#baseUrl = baseUrl;
    this.#middlewares = middlewares;
  }

  newRouter(): Router {
    return Router();
  }

  handle(): Router {
    const controllerRouter = Router();

    if (this.#middlewares.length) {
      controllerRouter.use(...this.#middlewares);
    }

    this.execute(controllerRouter);

    const mainRouter = Router();

    return mainRouter.use(
      `/${this.#baseUrl.replace(/^\/+/, '')}`,
      controllerRouter,
    );
  }
}

export interface ControllerInstance {
  new (): Controller;
}

export interface BuildControllerConfig {
  make(): Router;
}

export function buildController<T extends ControllerInstance>(
  Instance: T,
): BuildControllerConfig {
  function make(): Router {
    const controller = new Instance();

    return controller.handle();
  }

  return {
    make,
  };
}
