const { resolve } = require('path');

module.exports = {
  extends: [
    '@hitechline/eslint-config/web',
    require.resolve('../../.eslintrc.js'),
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
    'react/require-default-props': 'off',

    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
        ],
      },
    ],
  },
  overrides: [
    {
      files: '**/tailwind.config.js',
      rules: {
        'global-require': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
      },
    },
  ],
};
