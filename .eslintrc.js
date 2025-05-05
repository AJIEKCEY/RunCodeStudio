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
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-namespace': 'warn',
    'no-console': ['error', { allow: ['info', 'error', 'warn'] }],
    "no-restricted-imports": ["error", {
      "paths": [{
        "name": "antd",
        "message": "Please use only antd/lib"
      }]
    }]
  },
  ignorePatterns: [
    "packages/client/server/**/*.js",
    "packages/server/models/**/*.ts",
    "packages/client/dist/**",
    "**/dist/**"
  ]
}
