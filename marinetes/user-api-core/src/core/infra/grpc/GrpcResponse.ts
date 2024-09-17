import * as errors from '@marinetesio/errors';
import { RpcError } from '@protobuf-ts/runtime-rpc';

function isJSON(str: string): boolean {
  try {
    JSON.parse(str);
  } catch {
    return false;
  }

  return true;
}

export function getGrpcError(error: unknown): errors.ErrorBase {
  if (error instanceof RpcError && error.message && isJSON(error.message)) {
    const errorBase = JSON.parse(error.message) as errors.ErrorBase;

    const classes = Object.values(errors) as Array<any>;

    const ErrorClass = classes.find(({ name }: any) => name === errorBase.code);

    if (ErrorClass) {
      const instance = new ErrorClass((<any>errorBase).errors);

      return instance as errors.ErrorBase;
    }
  }

  return new errors.APIError();
}
