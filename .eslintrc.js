module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'no-console': ['error', { allow: ['info', 'error', 'warn'] }],
    "no-restricted-imports": ["error", {
      "paths": [{
        "name": "antd",
        "message": "Please use only antd/lib"
      }]
    }]
  },
  ignorePatterns: "packages/client/server/**/*.js"
}
