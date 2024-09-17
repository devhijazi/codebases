const presets = ['main', 'import', 'prettier', 'react'].map(preset =>
  require.resolve(`../presets/${preset}`),
);

module.exports = {
  plugins: ['jsx-a11y'],
  extends: ['airbnb', 'plugin:jsx-a11y/recommended', ...presets],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  env: {
    es6: true,
    jest: true,
    node: true,
    browser: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
