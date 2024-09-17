const { writeFileSync, readFileSync, existsSync } = require('fs');
const { resolve, join } = require('path');

const fastGlob = require('fast-glob');

const BASE_PATH = resolve(__dirname, '..');
const PACKAGE_PATH = join(BASE_PATH, 'package.json');

const folders = ['all', 'dtos', 'model', 'modules'];

const files = fastGlob.sync(
  folders.map(folder => `${folder}/**/*.(js|ts)`),
  {
    cwd: BASE_PATH,
  },
);

const isIndex = file => /index\.js$/.test(file);
const replaceTSToJS = file => file.replace(/\.ts$/, '.js');
const removeExtension = file => file.replace(/\.js$/, '');

const packageExports = files.map(replaceTSToJS).reduce((attr, file) => {
  const filePathWithoutExtension = removeExtension(file);

  const filePathSplited = filePathWithoutExtension.split(/\//);

  const _fileName = filePathSplited.pop();
  const fileFolder = filePathSplited.join('/');
  const fileFullFolder = join(BASE_PATH, fileFolder);

  if (isIndex(file)) {
    Object.assign(attr, {
      [`./${fileFolder}`]: `./dist/${file}`,
    });
  }

  if (existsSync(fileFullFolder)) {
    Object.assign(attr, {
      [`./${fileFolder}/*`]: `./dist/${fileFolder}/*.js`,
    });
  }

  return attr;
}, {});

const packageFileContent = readFileSync(PACKAGE_PATH, 'utf-8');
const packageFileContentObject = JSON.parse(packageFileContent);

delete packageFileContentObject.exports;

const newPackageFileContentObject = {
  ...packageFileContentObject,
  exports: packageExports,
};

writeFileSync(
  PACKAGE_PATH,
  `${JSON.stringify(newPackageFileContentObject, null, 2)}\n`,
  'utf-8',
);
