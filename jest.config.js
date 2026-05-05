module.exports = {
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': [
      'ts-jest',
      {
        tsConfig: 'tsconfig.jest.json'
      },
    ],
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  testRegex: "((\\.|/)jest)\\.[mc]?[jt]sx?$",
  verbose: true,
  silent: true,
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporters',
      {
        pageTitle: 'Test Report',
        publicPath: './test-results',
        filename: 'jest-report.html',
      },
    ],
  ],
}
