import { Level, LevelContext } from './types';

export const Levels: Record<Level, Readonly<LevelContext>> = {
  [Level.Success]: { color: 'green', method: 'info', name: 'success' },
  [Level.Trace]: { color: 'blueBright', method: 'trace', name: 'trace' },
  [Level.Debug]: { color: 'magenta', method: 'debug', name: 'debug' },
  [Level.Info]: { color: 'blue', method: 'info', name: 'info' },
  [Level.Warn]: { color: 'yellow', method: 'warn', name: 'warn' },
  [Level.Error]: { color: 'red', method: 'error', name: 'error' },
  [Level.Fatal]: { color: 'redBright', method: 'error', name: 'fatal' },
};
