module.exports = {
  root: true,
  extends: [
    '@hitechline',
    '@hitechline/eslint-config/typescript',
    require.resolve('@marinetes/database/eslint'),
  ],
  rules: {
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
};
