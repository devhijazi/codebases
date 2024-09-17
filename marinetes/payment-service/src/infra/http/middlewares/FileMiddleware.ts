/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  BadRequestError,
  FileNotFoundError,
  FileTypeNotAllowedError,
} from '@marinetesio/errors';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import { Middleware, buildMiddleware } from '@/core/infra/http/Middleware';

export interface FileConfig {
  limitSizeInMegaBytes: number;
  allowedTypes: [string, ...string[]];
}

interface FileMiddlewareOptions {
  fields: string[];
  config: FileConfig;
}

class FileMiddlewareStructure extends Middleware<FileMiddlewareOptions> {
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
        _request: unknown,
        file: MulterFile,
        callback: (...params: any[]) => any,
      ): void => {
        if (!this.options.fields.includes(file.fieldname)) {
          callback(new FileNotFoundError());

          return;
        }

        if (!this.options.config.allowedTypes.includes(file.mimetype)) {
          callback(new FileTypeNotAllowedError());

          return;
        }

        callback(null, true);
      },
    });

    upload.any()(request, response, err => {
      if (err) {
        next(err);

        return;
      }

      const files = request.files as Express.Multer.File[];

      if (!files) {
        next(new BadRequestError());

        return;
      }

      const fieldsNames = files.map(file => file.fieldname);

      if (
        !(this.options.fields.length === fieldsNames.length) &&
        !this.options.fields.every(
          (value, index) => value === fieldsNames[index],
        )
      ) {
        next(new BadRequestError());

        return;
      }

      next();
    });
  }
}

export const FileMiddleware = buildMiddleware(FileMiddlewareStructure);
