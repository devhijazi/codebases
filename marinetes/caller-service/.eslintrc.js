module.exports = {
  root: true,
  extends: [
    '@marinetesio/eslint-config/node',
    '@marinetesio/eslint-config/typescript',
  ],
  rules: {
    'no-useless-constructor': 'off',
    'no-param-reassign': 'off',

    'import/no-unresolved': 'off',
  },
};
