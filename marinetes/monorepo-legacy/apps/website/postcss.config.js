module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        stage: 0,
        features: {
          'nesting-rules': false,
        },
      },
    ],
    'tailwindcss/nesting',
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'autoprefixer',
      {
        flexbox: 'no-2009',
      },
    ],
    [
      'cssnano',
      {
        preset: 'default',
      },
    ],
  ],
};
