// /eslint-rules/rules/no-immediate-execution.js
// ESLint rule to prevent immediate code execution at module level
// Ensures imports don't trigger side effects or computations
// RELEVANT FILES: ../index.js, no-global-listeners.js

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent immediate code execution at module level',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          allowedPatterns: {
            type: 'array',
            items: { type: 'string' },
            description: 'Regex patterns for allowed immediate execution',
          },
          allowConstants: {
            type: 'boolean',
            description: 'Allow constant declarations with immediate values',
            default: true,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      immediateExecution: 'Immediate execution detected at module level. This creates side effects on import.',
      functionCall: 'Function call "{{name}}" at module level. Move inside component or hook.',
      conditionalExecution: 'Conditional execution at module level. This may cause side effects.',
      loopExecution: 'Loop at module level. This creates side effects on import.',
      asyncExecution: 'Async operation at module level. This creates side effects on import.',
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const allowedPatterns = (options.allowedPatterns || []).map(p => new RegExp(p));
    const allowConstants = options.allowConstants !== false;

    /**
     * Functions that are generally safe to call at module level
     */
    const safeFunctions = [
      // Object/Array methods that return new values
      'Object.keys', 'Object.values', 'Object.entries', 'Object.assign',
      'Object.create', 'Object.freeze', 'Object.seal',
      'Array.from', 'Array.of',
      
      // Utility functions that don't cause side effects
      'JSON.parse', 'JSON.stringify',
      'Number.parseInt', 'Number.parseFloat',
      'String.fromCharCode',
      
      // React/library helpers
      'createContext', 'forwardRef', 'memo',
      'defineProperty', 'getOwnPropertyDescriptor',
      
      // Build-time safe functions
      'require.resolve',
    ];

    /**
     * Expressions that cause side effects
     */
    const sideEffectExpressions = [
      'console.log', 'console.warn', 'console.error', // Logging
      'alert', 'confirm', 'prompt', // Browser dialogs
      'fetch', 'XMLHttpRequest', // Network requests
      'localStorage', 'sessionStorage', // Storage access
      'document.createElement', 'document.getElementById', // DOM manipulation
      'window.open', 'window.close', // Window management
    ];

    let moduleLevel = true;
    let inFunction = false;
    let inClass = false;

    /**
     * Check if a function call is safe at module level
     */
    function isSafeFunction(node) {
      const name = getFunctionName(node);
      if (!name) return false;

      // Check against safe functions list
      if (safeFunctions.some(safe => name.includes(safe))) {
        return true;
      }

      // Check against allowed patterns
      if (allowedPatterns.some(pattern => pattern.test(name))) {
        return true;
      }

      // Check if it's a pure constant computation
      if (allowConstants && isPureConstantCall(node)) {
        return true;
      }

      return false;
    }

    /**
     * Get function name from call expression
     */
    function getFunctionName(node) {
      if (node.callee.type === 'Identifier') {
        return node.callee.name;
      }
      if (node.callee.type === 'MemberExpression') {
        const object = getFunctionName({ callee: node.callee.object }) || node.callee.object.name;
        const property = node.callee.property.name;
        return object ? `${object}.${property}` : property;
      }
      return null;
    }

    /**
     * Check if a call is a pure constant computation
     */
    function isPureConstantCall(node) {
      const name = getFunctionName(node);
      
      // Math operations are generally pure
      if (name && name.startsWith('Math.')) {
        return true;
      }

      // Type conversions are pure
      const pureConversions = ['Boolean', 'Number', 'String', 'Symbol'];
      if (pureConversions.includes(name)) {
        return true;
      }

      return false;
    }

    /**
     * Check if expression has side effects
     */
    function hasSideEffects(node) {
      const name = getFunctionName(node);
      return sideEffectExpressions.some(expr => name && name.includes(expr));
    }

    return {
      // Track when we enter/exit functions or classes
      'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression'() {
        inFunction = true;
      },
      'FunctionDeclaration, FunctionExpression, ArrowFunctionExpression:exit'() {
        inFunction = false;
      },
      'ClassDeclaration, ClassExpression'() {
        inClass = true;
      },
      'ClassDeclaration, ClassExpression:exit'() {
        inClass = false;
      },

      // Check call expressions at module level
      CallExpression(node) {
        if (!moduleLevel || inFunction || inClass) {
          return;
        }

        // Skip if it's a safe function
        if (isSafeFunction(node)) {
          return;
        }

        // Check for known side effects
        if (hasSideEffects(node)) {
          context.report({
            node,
            messageId: 'immediateExecution',
          });
          return;
        }

        // Report function calls at module level
        const name = getFunctionName(node);
        if (name) {
          context.report({
            node,
            messageId: 'functionCall',
            data: { name },
          });
        }
      },

      // Check for conditional execution at module level
      'IfStatement, ConditionalExpression'(node) {
        if (!moduleLevel || inFunction || inClass) {
          return;
        }

        context.report({
          node,
          messageId: 'conditionalExecution',
        });
      },

      // Check for loops at module level
      'ForStatement, ForInStatement, ForOfStatement, WhileStatement, DoWhileStatement'(node) {
        if (!moduleLevel || inFunction || inClass) {
          return;
        }

        context.report({
          node,
          messageId: 'loopExecution',
        });
      },

      // Check for async operations at module level
      'AwaitExpression'(node) {
        if (!moduleLevel || inFunction || inClass) {
          return;
        }

        context.report({
          node,
          messageId: 'asyncExecution',
        });
      },

      // Track variable declarations with function calls
      VariableDeclaration(node) {
        if (!moduleLevel || inFunction || inClass) {
          return;
        }

        for (const declarator of node.declarations) {
          if (declarator.init && declarator.init.type === 'CallExpression') {
            if (!isSafeFunction(declarator.init)) {
              const name = getFunctionName(declarator.init);
              context.report({
                node: declarator.init,
                messageId: 'functionCall',
                data: { name: name || 'unknown' },
              });
            }
          }
        }
      },
    };
  },
};