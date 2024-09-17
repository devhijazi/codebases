const bundleAnalyzer = require('@next/bundle-analyzer');
const sourceMaps = require('@zeit/next-source-maps');
const composePlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

const cacheHeaders = require('./config/cache-headers');

const __PROD__ = process.env.NODE_ENV === 'production';

module.exports = composePlugins(
  [
    [withPWA],
    [sourceMaps],
    [
      bundleAnalyzer,
      {
        enabled: !!process.env.ANALYZE,
      },
    ],
  ],
  {
    distDir: 'dist',
    webpack5: true,
    poweredByHeader: false,
    reactStrictMode: true,
    devIndicators: {
      autoPrerender: false,
    },
    images: {
      domains: ['marinetes.com.br', 'images.prismic.io'],
    },
    pwa: {
      dest: 'public',
      sw: 'service-worker.js',
      disable: !__PROD__,
    },
    generateBuildId: () => 'build',

    webpack: config => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      config.module.rules.push({
        test: /\.c\.md$/,
        use: ['raw-loader'],
      });

      return config;
    },
    headers: () => {
      const headers = [];

      if (__PROD__) {
        headers.push(...cacheHeaders);
      }

      return headers;
    },
  },
);
