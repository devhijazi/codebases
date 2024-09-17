import { readdir, readFileSync } from 'node:fs';
import { promisify } from 'node:util';

import { getPath } from './getPath';

const readdirAsync = promisify(readdir);

const extensionsRegex = /.(html|hbs|ejs|pug)$/;

function getTemplateName(file: string): string {
  return file.replace(extensionsRegex, '');
}

export async function getTemplateSourceByName(
  name: string,
  group: string,
): Promise<string> {
  const templates = await readdirAsync(
    getPath('infra', 'mail', 'templates', group),
  );

  if (!templates.length) {
    throw new Error('No templates found');
  }

  const fileName = templates.find(
    template => getTemplateName(template) === name,
  );

  if (!fileName) {
    throw new Error('File not found');
  }

  const templateFilePath = getPath(
    'infra',
    'mail',
    'templates',
    group,
    fileName,
  );

  const templateSource = readFileSync(templateFilePath, 'utf-8');

  return templateSource;
}
