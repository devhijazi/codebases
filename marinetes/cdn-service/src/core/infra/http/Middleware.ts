export abstract class Middleware<Options = false> {
  protected options: Options = {} as Options;

  abstract execute(...handlerParams: any[]): any;

  constructor(options: Options) {
    this.options = options;
  }
}

export interface MiddlewareInstance<O = any> {
  new (options: O): Middleware<O>;
}

export type MiddlewareGetOptions<T extends MiddlewareInstance> =
  T extends MiddlewareInstance<infer O> ? O : false;

type BuildMiddlewareConfig<T extends MiddlewareInstance> =
  MiddlewareGetOptions<T> extends false
    ? {
        make(): InstanceType<T>['execute'];
      }
    : Partial<MiddlewareGetOptions<T>> extends true
    ? {
        make(options?: MiddlewareGetOptions<T>): InstanceType<T>['execute'];
      }
    : {
        make(options: MiddlewareGetOptions<T>): InstanceType<T>['execute'];
      };

export function buildMiddleware<T extends MiddlewareInstance>(
  Instance: T,
): BuildMiddlewareConfig<T> {
  const make: BuildMiddlewareConfig<T>['make'] = (options: unknown) => {
    const middleware = new Instance(options);

    return middleware.execute.bind(middleware);
  };

  return {
    make,
  } as BuildMiddlewareConfig<T>;
}
