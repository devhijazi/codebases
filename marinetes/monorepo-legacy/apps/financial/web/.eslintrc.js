const { resolve } = require('path');

module.exports = {
  extends: [
    '@hitechline/eslint-config/web',
    require.resolve('../../../.eslintrc.js'),
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
  rules: {
    'import/no-duplicates': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
      },
    },
  ],
};
