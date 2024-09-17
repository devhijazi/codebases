module.exports = {
  overrides: [
    {
      files: ['**/reducer.ts'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
};
