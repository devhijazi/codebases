import type { MiddlewareBase } from '@/core/infra/http/bases/MiddlewareBase';

import { Router } from 'express';

type ControllerMiddlewares = MiddlewareBase['execute'][];

interface ControllerConfig {
  router: Router;
  baseUrl: string;
}

export abstract class ControllerBase {
  private readonly baseUrl: string;

  private readonly middlewares: ControllerMiddlewares;

  protected abstract load(router: Router): void;

  constructor(baseUrl: string, middlewares: ControllerMiddlewares = []) {
    this.baseUrl = baseUrl;
    this.middlewares = middlewares;
  }

  public newRouter(): Router {
    return Router();
  }

  public build(): ControllerConfig {
    const router = Router();

    if (this.middlewares.length) {
      router.use(...this.middlewares);
    }

    this.load(router);

    return {
      router,
      baseUrl: this.baseUrl.replace(/^\/+/, ''),
    };
  }
}
