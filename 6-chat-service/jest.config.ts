import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,

  // 1. Tell Jest NOT to ignore @faker-js/faker and lodash-es
  transformIgnorePatterns: [
    'node_modules/(?!(@faker-js/faker|lodash-es)/)'
  ],

  // 2. Tell ts-jest to transform BOTH .ts and .js files in node_modules
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },

  testMatch: ['<rootDir>/src/**/test/*.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/test/*.ts?(x)', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  },
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: {
    '@chat/(.*)': ['<rootDir>/src/$1']
  }
};

export default config;
