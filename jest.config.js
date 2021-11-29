/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
//   testMatch: [
//     '<rootDir>/**/__tests__/**/?(*.)(spec|test).js',
//     '<rootDir>/**/?(*.)(spec|test).js'
// ],
};