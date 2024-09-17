const cacheHeaders = [
  {
    source: '/(.*).(ttf|woff|fnt|fot)',
    headers: [
      {
        key: 'Cache-Control',
        value:
          'public, max-age=604800, s-maxage=604800, must-revalidate, proxy-revalidate',
      },
    ],
  },
  {
    source: '/(.*).(jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp)',
    headers: [
      {
        key: 'Cache-Control',
        value:
          'public, max-age=86400, s-maxage=86400, must-revalidate, proxy-revalidate',
      },
    ],
  },
  {
    source: '/(.*).css',
    headers: [
      {
        key: 'Cache-Control',
        value:
          'public, max-age=21600, s-maxage=21600, must-revalidate, proxy-revalidate',
      },
    ],
  },
];

module.exports = cacheHeaders;
