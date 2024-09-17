import { Helpers } from './helpers';
import { Levels } from './levels';
import { Level } from './types';

export class Logger {
  constructor(private readonly scope: string) {}

  trace(value: unknown, ...args: readonly unknown[]): void {
    Helpers.setWrite(this.scope, Levels[Level.Trace], value, args);
  }

  debug(value: unknown, ...args: readonly unknown[]): void {
    Helpers.setWrite(this.scope, Levels[Level.Debug], value, args);
  }

  info(value: unknown, ...args: readonly unknown[]): void {
    Helpers.setWrite(this.scope, Levels[Level.Info], value, args);
  }

  warn(value: unknown, ...args: readonly unknown[]): void {
    Helpers.setWrite(this.scope, Levels[Level.Warn], value, args);
  }

  error(value: unknown, ...args: readonly unknown[]): void {
    Helpers.setWrite(this.scope, Levels[Level.Error], value, args);
  }

  fatal(value: unknown, ...args: readonly unknown[]): void {
    Helpers.setWrite(this.scope, Levels[Level.Fatal], value, args);
  }

  success(value: unknown, ...args: readonly unknown[]): void {
    Helpers.setWrite(this.scope, Levels[Level.Success], value, args);
  }
}
