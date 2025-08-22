// /eslint-rules/rules/no-global-state.js
// ESLint rule to detect global state creation in component modules
// Warns about variables that persist across imports and component instances
// RELEVANT FILES: ../index.js, no-global-mutations.js

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Detect global state creation in component modules',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          allowConstants: {
            type: 'boolean',
            description: 'Allow constant declarations',
            default: true,
          },
          allowTypes: {
            type: 'boolean', 
            description: 'Allow type definitions',
            default: true,
          },
          allowedPatterns: {
            type: 'array',
            items: { type: 'string' },
            description: 'Regex patterns for allowed global state',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      globalState: 'Global state variable "{{name}}" detected. This persists across component instances.',
      mutableGlobal: 'Mutable global variable "{{name}}". Consider using React state or context instead.',
      globalCache: 'Global cache variable "{{name}}". Consider using React patterns for state management.',
      globalCounter: 'Global counter/ID variable "{{name}}". This creates shared state across instances.',
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const allowConstants = options.allowConstants !== false;
    const allowTypes = options.allowTypes !== false;
    const allowedPatterns = (options.allowedPatterns || []).map(p => new RegExp(p));

    const moduleGlobals = new Set();
    let inFunction = false;
    let inClass = false;

    /**
     * Patterns that indicate global state
     */
    const globalStatePatterns = [
      /cache/i,
      /store/i,
      /registry/i,
      /pool/i,
      /queue/i,
      /buffer/i,
      /counter/i,
      /index/i,
      /id/i,
      /instance/i,
    ];

    /**
     * Safe constant patterns
     */
    const safeConstantPatterns = [
      /^[A-Z_][A-Z0-9_]*$/, // UPPER_SNAKE_CASE constants
      /^DEFAULT_/,
      /^INITIAL_/,
      /^CONFIG_/,
      /^STYLE/,
      /^CLASS/,
      /Props$/,
      /Type$/,
      /Schema$/,
    ];

    /**
     * Check if variable name indicates global state
     */
    function isGlobalState(name, node) {
      // Check allowed patterns first
      if (allowedPatterns.some(pattern => pattern.test(name))) {
        return false;
      }

      // Safe constant patterns
      if (safeConstantPatterns.some(pattern => pattern.test(name))) {
        return false;
      }

      // Check for global state indicators
      return globalStatePatterns.some(pattern => pattern.test(name));
    }

    /**
     * Check if variable is likely mutable
     */
    function isMutableVariable(node, declaration) {
      // const declarations are less likely to be problematic
      if (declaration.kind === 'const') {
        return false;
      }

      // let/var with object/array initializers are likely mutable
      if (node.init) {
        const initType = node.init.type;
        if (initType === 'ObjectExpression' || 
            initType === 'ArrayExpression' ||
            initType === 'NewExpression') {
          return true;
        }
      }

      return declaration.kind === 'let' || declaration.kind === 'var';
    }

    /**
     * Get variable type from initializer
     */
    function getVariableType(init) {
      if (!init) return 'undefined';
      
      switch (init.type) {
        case 'ObjectExpression': return 'object';
        case 'ArrayExpression': return 'array';
        case 'FunctionExpression':
        case 'ArrowFunctionExpression': return 'function';
        case 'NewExpression': return `new ${init.callee.name || 'unknown'}`;
        case 'Literal': return typeof init.value;
        case 'Identifier': return 'reference';
        default: return init.type;
      }
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

      // Variable declarations at module level
      VariableDeclaration(node) {
        // Only check module-level declarations
        if (inFunction || inClass) {
          return;
        }

        for (const declarator of node.declarations) {
          if (declarator.id.type === 'Identifier') {
            const name = declarator.id.name;
            
            // Skip type definitions if allowed
            if (allowTypes && (name.endsWith('Type') || name.endsWith('Props') || name.endsWith('Schema'))) {
              continue;
            }

            // Skip constants if allowed and it's a const declaration
            if (allowConstants && node.kind === 'const' && !isMutableVariable(declarator, node)) {
              continue;
            }

            // Track all module-level variables
            moduleGlobals.add(name);

            // Check for patterns indicating global state
            if (isGlobalState(name, declarator)) {
              const varType = getVariableType(declarator.init);
              
              if (name.toLowerCase().includes('cache')) {
                context.report({
                  node: declarator,
                  messageId: 'globalCache',
                  data: { name },
                });
              } else if (name.toLowerCase().includes('counter') || name.toLowerCase().includes('id')) {
                context.report({
                  node: declarator,
                  messageId: 'globalCounter',
                  data: { name },
                });
              } else if (isMutableVariable(declarator, node)) {
                context.report({
                  node: declarator,
                  messageId: 'mutableGlobal',
                  data: { name },
                });
              } else {
                context.report({
                  node: declarator,
                  messageId: 'globalState',
                  data: { name },
                });
              }
            }
          }
        }
      },

      // Function declarations at module level (potential state holders)
      FunctionDeclaration(node) {
        if (inFunction || inClass) {
          return;
        }

        const name = node.id?.name;
        if (name && isGlobalState(name, node)) {
          moduleGlobals.add(name);
          context.report({
            node,
            messageId: 'globalState',
            data: { name },
          });
        }
      },

      // Class declarations (potential state containers)
      ClassDeclaration(node) {
        if (inFunction || inClass) {
          return;
        }

        const name = node.id?.name;
        if (name && isGlobalState(name, node)) {
          moduleGlobals.add(name);
          context.report({
            node,
            messageId: 'globalState',
            data: { name },
          });
        }
      },

      // Check for assignments to module-level variables
      AssignmentExpression(node) {
        if (node.left.type === 'Identifier') {
          const name = node.left.name;
          if (moduleGlobals.has(name) && !inFunction && !inClass) {
            context.report({
              node,
              messageId: 'mutableGlobal',
              data: { name },
            });
          }
        }
      },

      // End of program - summary
      'Program:exit'() {
        if (moduleGlobals.size > 10) { // Arbitrary threshold
          // Could add a warning about too many module-level variables
          // but this might be too noisy for legitimate cases
        }
      },
    };
  },
};