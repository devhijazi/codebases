import 'typescript/lib/lib.es5';

declare global {
  interface Array<T> {
    flatMap<U>(
      callbackfn: (value: T, index: number, array: T[]) => U,
      thisArg?: any,
    ): [...U];
  }
}
