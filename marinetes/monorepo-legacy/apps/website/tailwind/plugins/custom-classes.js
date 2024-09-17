const { readFileSync } = require('fs');
const { resolve } = require('path');

const fastGlob = require('fast-glob');
const plugin = require('tailwindcss/plugin');

const ignoreFiles = ['index.css'];

const rootPath = resolve(__dirname, '..', '..');
const customClassesPath = 'src/screen/styles/global/classes/*.css';

function getContents() {
  const allCustomClassesFiles = fastGlob.sync(customClassesPath, {
    cwd: rootPath,
    absolute: true,
  });
  const customClassesFiles = allCustomClassesFiles.filter(
    file => !ignoreFiles.some(ignoreFile => file.endsWith(ignoreFile)),
  );

  const contents = customClassesFiles.map(path => readFileSync(path, 'utf-8'));

  return contents;
}

const customClassesPlugin = plugin(({ addComponents, postcss }) => {
  const contents = getContents();

  contents.forEach(css => {
    addComponents(postcss.parse(css).nodes);
  });
});

module.exports = customClassesPlugin;
