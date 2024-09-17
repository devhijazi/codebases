import { join } from 'path';

const rootPath = join(process.cwd());

export function getRootPath(...paths: string[]): string {
  return join(rootPath, ...paths);
}

export function getPublicPath(...paths: string[]): string {
  return join(rootPath, 'public', ...paths);
}

export function getTemplatePath(...paths: string[]): string {
  return getPublicPath('templates', ...paths);
}
