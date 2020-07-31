// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require('os');

module.exports = {
  preset: 'ts-jest',
  automock: false,
  browser: true,
  clearMocks: true,
  resetMocks: true,
  resetModules: true,
  collectCoverage: true,
  displayName: 'Vectorizer',
  maxConcurrency: os.cpus().length,
  testURL: 'http://localhost',
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['node_modules', '.cache', 'coverage'],
  testRegex: '(/tests/.*|(\\.|/)(tests|spec))\\.tsx?$',
};
