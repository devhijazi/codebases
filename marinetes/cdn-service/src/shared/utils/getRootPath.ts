import { resolve } from 'node:path';

export function getRootPath(...paths: string[]): string {
  return resolve(...paths);
}
