import type { BaseSchema, ValidationError } from 'yup';

export interface ValidatedInfo {
  data: Record<string, any>;
  error?: ValidationError;
}

export async function validateSchemaAndGetData(
  data: Record<string, any>,
  schema?: BaseSchema,
): Promise<ValidatedInfo> {
  if (!schema) {
    return {
      data,
    };
  }

  try {
    const validatedData = await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    return {
      data: validatedData,
    };
  } catch (error: any) {
    return {
      data,
      error,
    };
  }
}
