import * as path from 'path';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@server/(.*)$': '<rootDir>/$1',
    '^@shared/(.*)$': path.join(__dirname, '../shared/$1'),
  },
  rootDir: 'src',
  testMatch: ['**/**.test.ts', '**/**.e2e-spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>config.ts'],
};
