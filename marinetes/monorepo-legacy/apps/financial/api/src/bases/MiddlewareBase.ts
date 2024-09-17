import type { IsAllPartial } from '@marinetes/types/all';

interface MiddlewareBaseInstance<O = any> {
  new (options: O): MiddlewareBase<O>;
}

type GetOptions<T extends MiddlewareBaseInstance> =
  T extends MiddlewareBaseInstance<infer O> ? O : false;

type MiddlewareConfig<T extends MiddlewareBaseInstance> =
  GetOptions<T> extends false
    ? {
        make(): InstanceType<T>['execute'];
      }
    : IsAllPartial<GetOptions<T>> extends true
    ? {
        make(options?: GetOptions<T>): InstanceType<T>['execute'];
      }
    : {
        make(options: GetOptions<T>): InstanceType<T>['execute'];
      };

export abstract class MiddlewareBase<Options = false> {
  protected options: Options = {} as Options;

  public abstract execute(...handlerParams: any[]): any;

  constructor(options: Options) {
    this.options = options;
  }
}

export function buildMiddleware<T extends MiddlewareBaseInstance>(
  MiddlewareInstance: T,
): MiddlewareConfig<T> {
  const make: MiddlewareConfig<T>['make'] = (options: unknown) => {
    const middleware = new MiddlewareInstance(options);

    return middleware.execute.bind(middleware);
  };

  return {
    make,
  } as MiddlewareConfig<T>;
}
