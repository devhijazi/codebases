const { resolve } = require('path');

const fastGlob = require('fast-glob');

module.exports = {
  theme: requireTheme('./tailwind/theme'),

  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/screen/atoms/**/*.{js,ts,jsx,tsx}',
    './src/screen/components/**/*.{js,ts,jsx,tsx}',
  ],

  plugins: [
    require('@mertasan/tailwindcss-variables'),
    require('./tailwind/plugins/custom-classes'),
  ],

  future: {
    applyComplexClasses: true,
    purgeLayersByDefault: true,
  },
};

function requireTheme() {
  deleteCache();

  return require('./tailwind/theme');
}

function deleteCache() {
  const tailwindFiles = fastGlob.sync('./tailwind/**/*.js');

  tailwindFiles.forEach(file => {
    const fullFilePath = resolve(__dirname, file);

    delete require.cache[require.resolve(fullFilePath)];
  });
}

/* eslint global-require: off */
