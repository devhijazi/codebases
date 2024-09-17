const { spawn } = require('child_process');

const IS_WINDOW = /^win/.test(process.platform);
const YARN_COMMAND = IS_WINDOW ? 'yarn.cmd' : 'yarn';

/**
 * @param {string[]} args
 * @param {{
 * log?: boolean;
 * cwd?: string;
 * env?: Record<string, string>
 * }} config
 *
 * @return {Promise<void>}
 */
async function runYarn(args, config = {}) {
  const { cwd, env, log = true } = config;

  const spawnOptions = {
    cwd,
    env,
  };

  if (log) {
    Object.assign(spawnOptions, {
      stdio: 'inherit',
    });
  }

  return new Promise((resolvePromise, reject) => {
    const childProcess = spawn(YARN_COMMAND, args, spawnOptions);

    childProcess.once('error', () => {
      reject();
    });

    childProcess.once('close', code => {
      if (code !== 0) {
        reject();
      }

      resolvePromise();
    });
  });
}

module.exports = {
  runYarn,
};
