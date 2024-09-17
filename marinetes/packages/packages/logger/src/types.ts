import { Colorette } from 'colorette';

export type Method = 'debug' | 'error' | 'info' | 'trace' | 'warn';

export const enum Level {
  Success,
  Trace,
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
}

export interface LevelContext {
  name: string;
  color: keyof Colorette;
  method: Method;
}
