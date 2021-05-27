export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    "@App/(.*)": "<rootDir>/src/$1",
    "@Common/(.*)": "<rootDir>/src/common/$1",
    "@Messages/(.*)": "<rootDir>/src/messages/$1",
    "@Models/(.*)": "<rootDir>/src/models/$1",
    "@Services/(.*)": "<rootDir>/src/services/$1",
  }
};
