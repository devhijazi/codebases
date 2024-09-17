const { build } = require('gluegun');

process.env.NODE_ENV = 'development';

async function run(argv) {
  const cli = build()
    .brand('creation')
    .src(__dirname)
    .help()
    .defaultCommand()
    .create();

  const toolbox = await cli.run(argv);

  return toolbox;
}

module.exports = {
  run,
};
