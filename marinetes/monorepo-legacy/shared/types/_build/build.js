const { resolve } = require('path');

const { build } = require('esbuild');
const fastGlob = require('fast-glob');

const BASE_PATH = resolve(__dirname, '..');

const folders = ['all', 'dtos', 'model', 'modules'];

build({
  platform: 'node',
  outdir: 'dist',
  format: 'cjs',
  target: 'es2015',
  logLevel: 'info',
  tsconfig: 'tsconfig.json',
  absWorkingDir: BASE_PATH,

  minify: true,
  keepNames: true,
  sourcemap: true,

  entryPoints: fastGlob.sync(
    folders.map(folder => `${folder}/**/*.(js|ts)`),
    {
      cwd: BASE_PATH,
    },
  ),
});
