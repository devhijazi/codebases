const presets = ['main', 'import', 'prettier'].map(preset =>
  require.resolve(`../presets/${preset}`),
);

module.exports = {
  extends: ['airbnb-base', ...presets],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  env: {
    es6: true,
    jest: true,
    node: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
};
