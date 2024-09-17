const { resolve, join } = require('path');

const { eachSeries } = require('async');
const esbuild = require('esbuild');
const fastGlob = require('fast-glob');

const { runYarn } = require('./run-yarn');

const ROOT_PATH = resolve(__dirname, '..');
const APPS_PATH = join(ROOT_PATH, 'apps');

const standard = [
  'diarist/api',
  'user/api',
  'financial/api',
  'scheduling-service',
  'services-list-service',
];
const cra = ['financial/web'];
const nextjs = ['website'];

const packagesWithError = new Set();

let first = true;

buildPackages();

async function buildPackages() {
  console.log();

  await buildFlow(standard, async ({ packagePath, packageName, log }) => {
    console.log(`[${packageName}]: Preparando...`);

    await runYarn(['run', '-T', 'rimraf', 'dist'], {
      log: false,
      cwd: packagePath,
    });

    log(`[${packageName}]: Buildando...`);

    await buildStandard(packagePath);
  });

  // Build CRA Apps

  await buildFlow(cra, async ({ packagePath, packageName, log }) => {
    console.log(`[${packageName}]: Preparando...`);

    await runYarn(['run', '-T', 'rimraf', 'dist'], {
      log: false,
      cwd: packagePath,
    });

    log('Buildando...');

    console.log();

    await runYarn(['build'], {
      cwd: packagePath,
      env: {
        BUILD_PATH: 'dist',
      },
    });
  });

  // Build NextJS Apps

  await buildFlow(nextjs, async ({ packagePath, packageName, log }) => {
    console.log(`[${packageName}]: Preparando...`);

    await runYarn(['run', '-T', 'rimraf', 'dist'], {
      log: false,
      cwd: packagePath,
    });

    log('Buildando...');

    console.log();

    await runYarn(['build'], {
      cwd: packagePath,
    });

    console.log();
  });

  if (packagesWithError.size) {
    process.exit(1);
  }
}

/**
 * @param {string[]} apps
 * @param {(data: {
 * appFolder: string,
 * appPath: string,
 * packageName: string,
 * log: (message: string) => void }) => any} flow
 */
async function buildFlow(apps, flow) {
  await eachSeries(apps, async appFolder => {
    const packagePath = resolve(APPS_PATH, appFolder);

    const packageJSON = require(join(packagePath, 'package.json'));
    const packageName = packageJSON.name;

    const log = message => {
      console.log(`[${packageName}]: ${message}`);
    };

    if (!first) {
      console.log('--\n');
    } else {
      first = false;
    }

    try {
      await flow({
        appFolder,
        packagePath,
        packageName,
        log,
      });

      log('Compilado com sucesso.');
    } catch {
      log('Ocorreu um erro.');

      packagesWithError.add(packageName);
    } finally {
      console.log();
      Promise.resolve();
    }
  });
}

async function buildStandard(cwd) {
  const buildInfo = await esbuild.build({
    platform: 'node',
    outfile: 'dist/main.js',
    format: 'cjs',
    target: 'es2020',
    tsconfig: 'tsconfig.json',
    absWorkingDir: cwd,

    minify: true,
    bundle: true,
    metafile: true,

    entryPoints: ['src/server.ts'],
    inject: fastGlob.sync('src/**.(js|ts)', {
      cwd,
      ignore: ['src/server.ts'],
    }),
  });

  const outputs = Object.entries(buildInfo.metafile.outputs).map(
    ([fileName, info]) => ({
      fileName,
      info,
    }),
  );

  const outputParsed = outputs
    .map(
      data =>
        `\x1b[36m${data.fileName}\x1b[0m \x1b[33m${convertBytesInMB(
          data.info.bytes,
        )}mb\x1b[0m`,
    )
    .join('\n');

  console.log(`\n${outputParsed}\n`);
}

function convertBytesInMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}
