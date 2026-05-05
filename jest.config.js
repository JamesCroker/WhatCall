module.exports = {
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': [
      'ts-jest',
      {
        '^.+\\.tsx?$': [
          'ts-jest',
          {},
        ],
        tsConfig: 'tsconfig.jest.json',
      },
    ],
    '^.+\\.tsx?$': [
      'ts-jest',
      {},
    ],
  },
  roots: [
    '<rootDir>/test',
  ],
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
