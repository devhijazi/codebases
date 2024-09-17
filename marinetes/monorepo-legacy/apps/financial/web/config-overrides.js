const { join } = require('path');

const { override, addBabelPlugins } = require('customize-cra');
const { alias, configPaths } = require('react-app-rewire-alias');

const { compilerOptions } = require('./tsconfig.paths.json');

const dirName = __dirname;
const tsConfigPath = join(dirName, 'tsconfig.paths.json');
const pathsBaseUrl = join(dirName, compilerOptions.baseUrl);

const paths = configPaths(tsConfigPath);
const pathsParsed = Object.entries(paths).reduce(
  (pathsObject, [currentAliase, currentPath]) =>
    Object.assign(pathsObject, {
      [currentAliase]: join(pathsBaseUrl, currentPath.replace(/\/?\*$/, '')),
    }),
  {},
);

module.exports = override(
  alias(pathsParsed),
  addBabelPlugins([
    '@emotion',
    {
      sourceMap: true,
      autoLabel: 'dev-only',
      labelFormat: '[local]',
      cssPropOptimization: true,
    },
  ]),
);
