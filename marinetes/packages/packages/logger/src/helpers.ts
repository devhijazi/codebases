import type { LevelContext } from './types';

import { Console } from 'node:console';
import { format, inspect } from 'node:util';

import { colors } from './colors';

const { gray, white } = colors;

export class Helpers {
  static getDateTime(): string {
    const date = new Date();

    return date.toLocaleTimeString();
  }

  static getPid(): number {
    return process.pid;
  }

  static getEnvironment(): string | null {
    return process.env.NODE_ENV?.trim() ?? null;
  }

  static getHeader(scope: string): string {
    const header: string[] = [`[${this.getDateTime()}]`, `(${this.getPid()})`];

    if (typeof scope !== 'undefined') {
      header.push(`[${scope}]`);
    }

    if (typeof process.env.NODE_ENV !== 'undefined') {
      header.push(`(${this.getEnvironment()})`);
    }

    return header.map(item => gray(item)).join(' ');
  }

  static setWrite(
    scope: string,
    context: LevelContext,
    value: unknown,
    args: readonly unknown[],
  ): void {
    const console = new Console(process.stdout, process.stderr);

    const header = `${this.getHeader(scope)} ${colors[context.color](
      context.name.toLowerCase(),
    )}`;

    const formatted =
      typeof value === 'string'
        ? format(value, ...args)
        : inspect(value, { colors: true });

    console[context.method](
      `${header} ${white(formatted.replaceAll('\n', `\n${header}`))}`,
    );
  }
}
