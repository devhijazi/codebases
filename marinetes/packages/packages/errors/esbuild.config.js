const { resolve } = require('path');

const { build } = require('esbuild');
const fg = require('fast-glob');

const BASE_PATH = resolve(__dirname, '.');

build({
  platform: 'node',
  outdir: 'dist',
  format: 'cjs',
  target: 'es2020',
  logLevel: 'info',
  tsconfig: 'tsconfig.json',
  absWorkingDir: BASE_PATH,
  minify: true,
  keepNames: true,
  sourcemap: true,
  entryPoints: fg.sync('src/**/*'),
});
