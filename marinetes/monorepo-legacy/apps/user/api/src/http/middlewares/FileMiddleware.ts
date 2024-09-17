import { BadRequestError } from '@marinetes/errors';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import multer, { Multer, Options as MulterOptions } from 'multer';

import { buildMiddleware, MiddlewareBase } from '@bases/MiddlewareBase';

interface Options {
  config?: MulterOptions;
  handler: (upload: Multer) => RequestHandler;
}

class Middleware extends MiddlewareBase<Options> {
  private middleware = this.options.handler(multer(this.options.config));

  execute(req: Request, res: Response, next: NextFunction): void {
    function myNext(): void {
      const { file, files } = req;

      if (!file && (!files || !files.length)) {
        next(new BadRequestError());

        return;
      }

      next();
    }

    this.middleware(req, res, myNext);
  }
}

export const FileMiddleware = buildMiddleware(Middleware);
