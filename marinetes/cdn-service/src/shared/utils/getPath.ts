import { join } from 'node:path';

export function getPath(...paths: string[]): string {
  return join(__dirname, '..', ...paths);
}
