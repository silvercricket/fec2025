/*global module process require*/
/*eslint no-undef: "error"*/
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
process.env.JEST_PUPPETEER_CONFIG = require.resolve('./jest-puppeteer.config.js');
const config = {
  // preset: 'jest-puppeteer',
  verbose : true,
  moduleNameMapper: {
    "\\.(css|jpg)$": "identity-obj-proxy",
  },
  bail: 1,
  //testEnvironment: 'jsdom',
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    '^.+\\.css$': 'jest-transform-css'
  },
  preset: "jest-puppeteer",
  testTimeout: 60000,
};


module.exports = config;