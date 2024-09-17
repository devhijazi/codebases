const { resolve } = require('path');

const { build } = require('esbuild');

const packageJSON = require('./package.json');

const BASE_PATH = resolve(__dirname, '.');

build({
  platform: 'node',
  outfile: 'dist/index.js',
  format: 'cjs',
  target: 'es2015',
  logLevel: 'info',
  tsconfig: 'tsconfig.json',
  absWorkingDir: BASE_PATH,

  minify: true,
  bundle: true,
  keepNames: true,
  sourcemap: true,

  entryPoints: ['src/index.ts'],
  external: [packageJSON.dependencies].flatMap(Object.keys),
});
