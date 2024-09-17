import * as errors from '@marinetesio/errors';
import { RpcError } from '@protobuf-ts/runtime-rpc';

export function parseCustomError(error: errors.ErrorBase): string {
  const errorInString = JSON.stringify(error.toObject());

  return errorInString;
}

export function getCustomError(error: unknown): RpcError {
  if (error instanceof errors.ErrorBase) {
    return new RpcError(parseCustomError(error));
  }

  const apiError = new errors.APIError();

  return new RpcError(parseCustomError(apiError));
}
