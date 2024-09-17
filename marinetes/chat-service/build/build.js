const { resolve, join } = require('path');

const { build } = require('esbuild');
const fastGlob = require('fast-glob');
const { replaceTscAliasPaths } = require('tsc-alias');

const ROOT_PATH = resolve(__dirname, '..');

async function run() {
  await build({
    platform: 'node',
    outdir: 'dist',
    format: 'cjs',
    target: 'es2020',
    tsconfig: 'tsconfig.json',
    absWorkingDir: ROOT_PATH,
    minify: true,
    entryPoints: fastGlob.sync(['protos/**/*', 'src/**/*']),
    loader: {
      '.proto': 'copy',
    },
  });

  await replaceTscAliasPaths({
    configFile: join(ROOT_PATH, 'tsconfig.json'),
    outDir: 'dist',
    verbose: true,
  });
}

run();
