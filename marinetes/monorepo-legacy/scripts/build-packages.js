const { existsSync } = require('fs');
const { resolve, join } = require('path');

const { eachSeries } = require('async');

const { runYarn } = require('./run-yarn');

const ROOT_PATH = resolve(__dirname, '..');

const packagesToBuildInOrder = [
  ['shared', 'types'],
  ['packages', 'utils'],
  ['packages', 'errors'],
  ['packages', 'password-helper'],
  ['packages', 'pagination-helper'],
  ['packages', 'mail-provider'],
  ['packages', 'validation-is-expired'],
  ['packages', 'database'],
  ['packages', 'firebase'],
  ['packages', 'diarist-validation-config'],
];

async function buildPackages() {
  const packagesWithError = new Set();

  await eachSeries(
    packagesToBuildInOrder,
    async ([packageFolder, packageName]) => {
      const packageScoped = `@marinetes/${packageName}`;

      const packageFullPath = join(ROOT_PATH, packageFolder, packageName);
      const hasPackage = existsSync(join(packageFullPath, 'package.json'));

      if (!hasPackage) {
        Promise.resolve();
        return;
      }

      try {
        console.log(`[${packageScoped}]: Buildando...`);

        await runYarn(['build'], {
          log: false,
          cwd: packageFullPath,
        });

        console.log(`[${packageScoped}]: Compilado com sucesso.`);
      } catch {
        console.log(`[${packageScoped}]: Ocorreu um erro.`);

        packagesWithError.add(packageScoped);
      } finally {
        console.log();
        Promise.resolve();
      }
    },
  );

  if (packagesWithError.size) {
    process.exit(1);
  }
}

buildPackages();
