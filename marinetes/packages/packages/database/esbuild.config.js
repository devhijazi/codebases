const { resolve } = require('path');

const { build } = require('esbuild');
const { copy } = require('esbuild-plugin-copy');
const fg = require('fast-glob');

const BASE_PATH = resolve(__dirname, '.');

build({
  platform: 'node',
  outdir: 'dist',
  format: 'cjs',
  target: 'es2020',
  logLevel: 'info',
  tsconfig: 'tsconfig.json',
  absWorkingDir: BASE_PATH,
  minify: true,
  keepNames: true,
  sourcemap: true,
  loader: {
    '.prisma': 'copy',
  },
  entryPoints: fg.sync('src/**/*', {
    ignore: [
      'src/prisma/mongo/generated',
      'src/typeorm/mysql/common',
      'src/typeorm/mysql/fixtures',
      'src/typeorm/mysql/migrastions',
    ],
  }),
  plugins: [
    copy({
      resolveFrom: 'cwd',
      watch: true,
      assets: [
        {
          from: ['./src/prisma/mongo/generated/**/*'],
          to: ['./dist/prisma/mongo/generated'],
        },
        {
          from: ['./src/prisma/mongo/generated/**/*.d.ts'],
          to: ['./typings/prisma/mongo/generated'],
        },
      ],
    }),
  ],
});
