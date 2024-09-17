module.exports = {
  root: true,
  extends: [
    '@hitechline/eslint-config/node',
    '@hitechline/eslint-config/typescript',
  ],
  rules: {
    'no-useless-constructor': 'off',

    'import/no-unresolved': 'off',
  },
};
