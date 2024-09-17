import { ValidationError, APIError } from '@hitechline/marinetes-errors';
import { Request, Response, NextFunction } from 'express';
import { ZodError, AnyZodObject } from 'zod';

export class Validation {
  private schema: AnyZodObject;

  constructor(schema: AnyZodObject) {
    this.schema = schema;
  }

  async execute(
    { manager, body, query }: Request,
    _response: Response,
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

export interface BuildValidationConfig {
  make(): Validation['execute'];
}

export function buildValidation(schema: AnyZodObject): BuildValidationConfig {
  function make(): Validation['execute'] {
    const validation = new Validation(schema);

    return validation.execute.bind(validation);
  }

  return {
    make,
  };
}
