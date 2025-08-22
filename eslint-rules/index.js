// /eslint-rules/index.js
// Custom ESLint rules to detect and prevent global side effects in components
// Ensures components are pure and don't execute code on import
// RELEVANT FILES: no-global-listeners.js, no-immediate-execution.js, no-global-mutations.js

module.exports = {
  rules: {
    'no-global-listeners': require('./rules/no-global-listeners'),
    'no-immediate-execution': require('./rules/no-immediate-execution'),
    'no-global-mutations': require('./rules/no-global-mutations'),
    'no-global-state': require('./rules/no-global-state'),
    'require-cleanup': require('./rules/require-cleanup'),
  },
  configs: {
    recommended: {
      rules: {
        'no-global-effects/no-global-listeners': 'error',
        'no-global-effects/no-immediate-execution': 'error',
        'no-global-effects/no-global-mutations': 'error',
        'no-global-effects/no-global-state': 'warn',
        'no-global-effects/require-cleanup': 'warn',
      },
    },
    strict: {
      rules: {
        'no-global-effects/no-global-listeners': 'error',
        'no-global-effects/no-immediate-execution': 'error',
        'no-global-effects/no-global-mutations': 'error',
        'no-global-effects/no-global-state': 'error',
        'no-global-effects/require-cleanup': 'error',
      },
    },
  },
};