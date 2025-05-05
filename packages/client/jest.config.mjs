import dotenv from 'dotenv'
dotenv.config()

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
  transform: {
    '^.+\\.(css|scss)$': 'jest-css-modules-transform',
  },
  verbose: true,
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@reduxjs/toolkit|@nivo))'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
}

export default config
