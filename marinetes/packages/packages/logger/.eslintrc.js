const { resolve } = require('path');

module.exports = {
  rules: {
    'no-useless-constructor': 'off',

    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [resolve(__dirname), resolve(__dirname, '..', '..')],
      },
    ],
  },
};
