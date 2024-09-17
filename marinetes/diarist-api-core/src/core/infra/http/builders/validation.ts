import { ValidationError, APIError } from '@marinetesio/errors';
import { Request, Response, NextFunction } from 'express';
import { ZodError, AnyZodObject } from 'zod';

class Validation {
  private schema: AnyZodObject;

  constructor(schema: AnyZodObject) {
    this.schema = schema;
  }

  public async execute(
    { query, body, manager }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = Object.assign(body, query);

      const dataParsed = await this.schema.parseAsync(data);

      manager.setData(dataParsed);

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(error.issues);
      }

      throw new APIError();
    }
  }
}

interface ValidationConfig {
  make(): Validation['execute'];
}

export function buildValidation(schema: AnyZodObject): ValidationConfig {
  function make(): Validation['execute'] {
    const validation = new Validation(schema);

    return validation.execute.bind(validation);
  }

  return {
    make,
  };
}
