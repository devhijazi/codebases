const { resolve } = require('path');

module.exports = {
  rules: {
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [resolve(__dirname), resolve(__dirname, '..', '..')],
      },
    ],
  },
};
