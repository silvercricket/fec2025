/*global module*/
/*eslint no-undef: "error"*/
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */

const config = {
  verbose : true,
  moduleNameMapper: {
    "\\.(css|jpg)$": "identity-obj-proxy",
  },
  bail: 1,
  testEnvironment: 'jsdom',
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    '^.+\\.css$': 'jest-transform-css'
  }
};


module.exports = config;