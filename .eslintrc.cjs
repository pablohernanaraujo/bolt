module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: ['next/core-web-vitals'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // Formatting rules
    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    // TypeScript rules
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none',
      },
    ],
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],

    // Code quality rules
    complexity: ['error', { max: 14 }],
    'max-depth': ['error', { max: 4 }],
    'max-nested-callbacks': ['error', { max: 3 }],
    'max-params': ['error', { max: 4 }],
    'max-statements': ['error', { max: 12 }],

    // Style rules
    'max-len': [
      'warn',
      {
        code: 82,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: false },
    ],

    // Disable React rules that are not needed in Next.js
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-children-prop': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'dist/',
    'storybook-static/',
    'public/',
    'scripts/',
    'eslint-rules/',
  ],
};
