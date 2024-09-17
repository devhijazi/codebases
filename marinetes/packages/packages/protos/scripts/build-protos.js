const { rm, mkdir, lstat } = require('fs/promises');
const { resolve, join } = require('path');

const execa = require('execa');
const fastGlob = require('fast-glob');

const PACKAGE_DIR = resolve(__dirname, '..');

const PROTOS_DIR = join(PACKAGE_DIR, 'src', 'protos');
const PROTOS_OUT_DIR = join(PROTOS_DIR, 'generated');

async function run() {
  const existsProtosOutDir = !!(await lstat(PROTOS_OUT_DIR).catch(() => null));

  if (existsProtosOutDir) {
    await rm(PROTOS_OUT_DIR, {
      recursive: true,
    });
  }

  await mkdir(PROTOS_OUT_DIR);

  const protoFiles = await fastGlob('**/*.proto', { cwd: PROTOS_DIR });

  await execa(
    'npx',
    [
      'protoc',
      ...protoFiles,
      '--ts_opt=ts_nocheck',
      '--ts_opt=client_grpc1',
      '--ts_opt=server_grpc1',
      '--ts_opt=optimize_code_size',
      '--ts_opt=use_proto_field_name',
      `--ts_out=${PROTOS_OUT_DIR}`,
      `--proto_path=${PROTOS_DIR}`,
    ],
    {
      cwd: PACKAGE_DIR,
    },
  );

  await execa(
    'npx',
    [
      'protoc',
      ...protoFiles,
      '--ts_opt=ts_nocheck',
      '--ts_opt=client_generic',
      '--ts_opt=server_generic',
      '--ts_opt=optimize_code_size',
      '--ts_opt=use_proto_field_name',
      `--ts_out=${PROTOS_OUT_DIR}`,
      `--proto_path=${PROTOS_DIR}`,
    ],
    {
      cwd: PACKAGE_DIR,
    },
  );

  console.log('Proto definitions generated.'); // eslint-disable-line no-console
}

run();
