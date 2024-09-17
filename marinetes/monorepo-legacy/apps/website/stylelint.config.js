module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'indentation': 2,
    'string-quotes': 'single',

    'function-url-quotes': 'always',
    'number-leading-zero': 'always',
    'comment-whitespace-inside': 'always',

    'no-duplicate-selectors': true,
    'no-descending-specificity': null,

    'color-named': 'never',
    'color-hex-case': 'lower',
    'color-hex-length': 'long',

    'property-no-vendor-prefix': null,
    'custom-property-empty-line-before': null,

    'font-family-name-quotes': 'always-where-recommended',
    'font-family-no-missing-generic-family-keyword': null,

    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-block-no-shorthand-property-overrides': null,
    'declaration-block-no-redundant-longhand-properties': null,

    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',

    'selector-max-id': 0,
    'selector-attribute-quotes': 'always',
    'selector-no-qualifying-type': null,
    'selector-combinator-space-after': 'always',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-brackets-space-inside': 'never',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message:
          'Selector should use lowercase and separate words with hyphens (selector-class-pattern)',
      },
    ],

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'layer',
          'screen',
          'variants',
          'tailwind',
          'responsive',
        ],
      },
    ],

    'unit-allowed-list': [
      '%',
      'vh',
      'vw',
      'px',
      'em',
      'rem',
      'deg',
      's',
      'ms',
      'fr',
    ],
    'unit-disallowed-list': [
      'px',
      {
        ignoreProperties: {
          px: [/--.*/],
        },
        ignoreMediaFeatureNames: {
          px: [/.*/],
        },
      },
    ],
  },
};
