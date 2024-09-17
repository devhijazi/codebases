const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverageFrom: [],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
