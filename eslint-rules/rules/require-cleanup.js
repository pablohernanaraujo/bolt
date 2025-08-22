// /eslint-rules/rules/require-cleanup.js
// ESLint rule to ensure proper cleanup of side effects in components
// Warns when effects are created without corresponding cleanup
// RELEVANT FILES: ../index.js, no-global-listeners.js

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure proper cleanup of side effects in components',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          checkHooks: {
            type: 'boolean',
            description: 'Check useEffect hooks for cleanup',
            default: true,
          },
          requireCleanupFor: {
            type: 'array',
            items: { type: 'string' },
            description: 'Methods that require cleanup',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingCleanup: 'Side effect "{{effect}}" detected without cleanup. Add cleanup in useEffect return or component unmount.',
      useEffectMissingCleanup: 'useEffect with side effects should return a cleanup function.',
      listenerWithoutRemoval: 'Event listener added without corresponding removal in cleanup.',
      timerWithoutClear: 'Timer/interval created without clearing in cleanup.',
      subscriptionWithoutUnsubscribe: 'Subscription created without unsubscribe in cleanup.',
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const checkHooks = options.checkHooks !== false;
    const requireCleanupFor = options.requireCleanupFor || [];

    const useEffectScopes = new Map(); // Track useEffect scopes and their cleanup

    /**
     * Side effects that typically require cleanup
     */
    const sideEffectsRequiringCleanup = [
      'addEventListener',
      'setTimeout', 
      'setInterval',
      'setImmediate',
      'requestAnimationFrame',
      'requestIdleCallback',
      'subscribe',
      'connect',
      'open',
      'observe', // Intersection/Mutation/Resize observers
      'new IntersectionObserver',
      'new MutationObserver',
      'new ResizeObserver',
      'new EventSource',
      'new WebSocket',
      'new XMLHttpRequest',
      ...requireCleanupFor,
    ];

    /**
     * Cleanup methods that correspond to side effects
     */
    const cleanupMethods = [
      'removeEventListener',
      'clearTimeout',
      'clearInterval', 
      'clearImmediate',
      'cancelAnimationFrame',
      'cancelIdleCallback',
      'unsubscribe',
      'disconnect',
      'close',
      'abort',
    ];

    /**
     * Get function name from call expression
     */
    function getFunctionName(node) {
      if (node.callee.type === 'Identifier') {
        return node.callee.name;
      }
      if (node.callee.type === 'MemberExpression') {
        const object = node.callee.object.name;
        const property = node.callee.property.name;
        return object ? `${object}.${property}` : property;
      }
      if (node.callee.type === 'NewExpression') {
        return `new ${getFunctionName({ callee: node.callee.callee })}`;
      }
      return null;
    }

    /**
     * Check if a function call requires cleanup
     */
    function requiresCleanup(node) {
      const name = getFunctionName(node);
      return name && sideEffectsRequiringCleanup.some(effect => 
        name.includes(effect) || name === effect
      );
    }

    /**
     * Check if cleanup method is present
     */
    function hasCleanupMethod(node) {
      const name = getFunctionName(node);
      return name && cleanupMethods.some(cleanup => 
        name.includes(cleanup) || name === cleanup
      );
    }

    /**
     * Track useEffect scope
     */
    function trackUseEffectScope(node) {
      if (node.callee.name === 'useEffect' && node.arguments.length > 0) {
        const effectFunction = node.arguments[0];
        const scope = {
          node,
          effectFunction,
          sideEffects: [],
          hasCleanup: false,
        };
        useEffectScopes.set(effectFunction, scope);
        return scope;
      }
      return null;
    }

    /**
     * Check if we're inside a useEffect
     */
    function getCurrentUseEffectScope(node) {
      let parent = node.parent;
      while (parent) {
        for (const [effectFunction, scope] of useEffectScopes) {
          if (parent === effectFunction) {
            return scope;
          }
        }
        parent = parent.parent;
      }
      return null;
    }

    /**
     * Analyze useEffect cleanup
     */
    function analyzeUseEffectCleanup(scope) {
      const { effectFunction, sideEffects } = scope;
      
      // Check if effect function returns a cleanup function
      let hasReturnCleanup = false;
      
      if (effectFunction.body.type === 'BlockStatement') {
        // Look for return statement
        const returnStatement = effectFunction.body.body.find(stmt => 
          stmt.type === 'ReturnStatement' && stmt.argument
        );
        
        if (returnStatement) {
          hasReturnCleanup = returnStatement.argument.type === 'FunctionExpression' ||
                            returnStatement.argument.type === 'ArrowFunctionExpression';
        }
      } else if (effectFunction.body.type === 'ArrowFunctionExpression') {
        // Arrow function returning cleanup directly
        hasReturnCleanup = true;
      }

      scope.hasCleanup = hasReturnCleanup;

      // Report if side effects exist without cleanup
      if (sideEffects.length > 0 && !hasReturnCleanup) {
        context.report({
          node: scope.node,
          messageId: 'useEffectMissingCleanup',
        });
      }
    }

    return {
      // Track useEffect calls
      CallExpression(node) {
        if (checkHooks && node.callee.name === 'useEffect') {
          trackUseEffectScope(node);
        }

        // Check for side effects that require cleanup
        if (requiresCleanup(node)) {
          const useEffectScope = getCurrentUseEffectScope(node);
          
          if (useEffectScope) {
            // Track side effect in useEffect scope
            useEffectScope.sideEffects.push(node);
          } else {
            // Side effect outside useEffect - likely problematic
            const name = getFunctionName(node);
            
            if (name && name.includes('addEventListener')) {
              context.report({
                node,
                messageId: 'listenerWithoutRemoval',
              });
            } else if (name && (name.includes('setTimeout') || name.includes('setInterval'))) {
              context.report({
                node,
                messageId: 'timerWithoutClear',
              });
            } else if (name && name.includes('subscribe')) {
              context.report({
                node,
                messageId: 'subscriptionWithoutUnsubscribe',
              });
            } else {
              context.report({
                node,
                messageId: 'missingCleanup',
                data: { effect: name || 'unknown' },
              });
            }
          }
        }
      },

      // Analyze all useEffect scopes at the end
      'Program:exit'() {
        for (const scope of useEffectScopes.values()) {
          analyzeUseEffectCleanup(scope);
        }
      },
    };
  },
};