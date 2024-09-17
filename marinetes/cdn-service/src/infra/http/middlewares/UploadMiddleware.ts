/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  BadRequestError,
  ImageTypeNotAllowedError,
} from '@hitechline/marinetes-errors';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import { Middleware, buildMiddleware } from '@/core/infra/http/Middleware';

export interface UploadConfig {
  limitSizeInMegaBytes: number;
  allowedTypes: [string, ...string[]];
}

interface UploadMiddlewareOptions {
  field: string;
  type: 'single' | 'array';
  config: UploadConfig;
}

class UploadMiddlewareStructure extends Middleware<UploadMiddlewareOptions> {
  async execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const upload = multer({
      limits: {
        fileSize: this.options.config.limitSizeInMegaBytes * 1024 * 1024,
      },
      fileFilter: (
        _request: Request,
        file: MulterFile,
        callback: (...params: any[]) => any,
      ): void => {
        if (this.options.config.allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new ImageTypeNotAllowedError());
        }
      },
    });

    upload[this.options.type]('image')(request, response, err => {
      if (err) {
        next(err);

        return;
      }

      const { file, files } = request;

      if (file || files) {
        next();

        return;
      }

      next(new BadRequestError());
    });
  }
}

export const UploadMiddleware = buildMiddleware(UploadMiddlewareStructure);
