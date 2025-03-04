import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  transform: {
    '^.+\\.css$': 'jest-css-modules-transform',
  },
  verbose: true,
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
