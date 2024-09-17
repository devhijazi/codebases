const defaultTheme = require('tailwindcss/defaultTheme');

const colors = require('./colors');
const variables = require('./variables');

const theme = {
  variables,

  fontFamily: {
    sans: ['Poppins', ...defaultTheme.fontFamily.sans],
  },
  extend: {
    colors,

    backgroundSize: {
      full: '100%',
    },
    borderRadius: {
      wai: '0.8rem',
    },
    padding: {
      '1-5': '0.2rem',
    },
    maxWidth: {
      wai: 'var(--wai-max-width)',
    },
    height: {
      wai: 'var(--wai-height)',
    },
    minHeight: {
      wai: 'var(--wai-height)',
    },
  },
};

module.exports = theme;
