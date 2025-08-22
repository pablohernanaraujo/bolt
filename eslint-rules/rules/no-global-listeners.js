// /eslint-rules/rules/no-global-listeners.js
// ESLint rule to prevent global event listeners in component modules
// Ensures components don't register listeners on window, document, or body during import
// RELEVANT FILES: ../index.js, performance-budgets.config.js

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent global event listeners in component modules',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          allowedComponents: {
            type: 'array',
            items: { type: 'string' },
            description: 'Components allowed to have global listeners',
          },
          allowInHooks: {
            type: 'boolean',
            description: 'Allow global listeners inside React hooks',
            default: true,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      globalListener: 'Global event listener "{{method}}" detected on "{{object}}". This creates side effects on import. Use a React hook or effect instead.',
      immediateGlobalListener: 'Global event listener registered at module level. Move this inside a React component or hook.',
      documentListener: 'Document event listener detected. Consider using React refs or portal patterns instead.',
      windowListener: 'Window event listener detected. Consider using React hooks with proper cleanup.',
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const allowedComponents = options.allowedComponents || [];
    const allowInHooks = options.allowInHooks !== false;

    // Get the file path to check if this component is allowed
    const filename = context.getFilename();
    const componentName = getComponentNameFromPath(filename);
    
    if (allowedComponents.includes(componentName)) {
      return {}; // Skip checking for allowed components
    }

    let isInReactHook = false;
    let isInReactComponent = false;
    let isInUseEffect = false;

    /**
     * Global objects that shouldn't have listeners at module level
     */
    const globalObjects = [
      'window',
      'document', 
      'body',
      'globalThis',
      'self',
      'parent',
      'top',
    ];

    /**
     * Event listener methods to detect
     */
    const listenerMethods = [
      'addEventListener',
      'removeEventListener',
      'attachEvent',
      'detachEvent',
      'on', // jQuery style
    ];

    /**
     * React hook patterns
     */
    const reactHookPatterns = [
      /^use[A-Z]/,
      'useEffect',
      'useLayoutEffect',
      'useCallback',
      'useMemo',
    ];

    /**
     * Extract component name from file path
     */
    function getComponentNameFromPath(filePath) {
      const parts = filePath.split('/');
      const fileName = parts[parts.length - 1];
      const dirName = parts[parts.length - 2];
      
      // Handle index.ts files - use directory name
      if (fileName === 'index.ts' || fileName === 'index.tsx') {
        return dirName;
      }
      
      // Remove extension and return
      return fileName.replace(/\.(ts|tsx|js|jsx)$/, '');
    }

    /**
     * Check if we're inside a React hook
     */
    function checkReactHookContext(node) {
      let parent = node.parent;
      while (parent) {
        if (parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression' || parent.type === 'ArrowFunctionExpression') {
          const name = parent.id?.name || (parent.parent?.type === 'VariableDeclarator' ? parent.parent.id?.name : null);
          if (name && reactHookPatterns.some(pattern => 
            typeof pattern === 'string' ? name === pattern : pattern.test(name)
          )) {
            return true;
          }
        }
        parent = parent.parent;
      }
      return false;
    }

    /**
     * Check if we're inside useEffect
     */
    function checkUseEffectContext(node) {
      let parent = node.parent;
      while (parent) {
        if (parent.type === 'CallExpression' && 
            parent.callee?.name === 'useEffect') {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    }

    /**
     * Check if we're inside a React component
     */
    function checkReactComponentContext(node) {
      let parent = node.parent;
      while (parent) {
        if (parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression' || parent.type === 'ArrowFunctionExpression') {
          const name = parent.id?.name;
          if (name && /^[A-Z]/.test(name)) { // Component names start with capital letter
            return true;
          }
        }
        parent = parent.parent;
      }
      return false;
    }

    return {
      CallExpression(node) {
        const { callee } = node;
        
        // Update context flags
        isInReactHook = checkReactHookContext(node);
        isInReactComponent = checkReactComponentContext(node);
        isInUseEffect = checkUseEffectContext(node);

        // Check for global object method calls
        if (callee.type === 'MemberExpression') {
          const objectName = callee.object?.name;
          const methodName = callee.property?.name;

          // Check for global listeners
          if (globalObjects.includes(objectName) && listenerMethods.includes(methodName)) {
            
            // Allow if we're inside a React hook and allowInHooks is true
            if (allowInHooks && (isInReactHook || isInUseEffect)) {
              return;
            }

            // Allow if we're inside a React component (but warn)
            if (isInReactComponent && !isInReactHook) {
              context.report({
                node,
                messageId: 'globalListener',
                data: {
                  method: methodName,
                  object: objectName,
                },
              });
              return;
            }

            // Specific messages for different global objects
            if (objectName === 'document') {
              context.report({
                node,
                messageId: 'documentListener',
              });
            } else if (objectName === 'window') {
              context.report({
                node,
                messageId: 'windowListener',
              });
            } else {
              context.report({
                node,
                messageId: 'immediateGlobalListener',
              });
            }
          }
        }

        // Check for indirect global listener calls (e.g., through variables)
        if (callee.type === 'MemberExpression' && 
            callee.property?.name && 
            listenerMethods.includes(callee.property.name)) {
          
          // Try to trace back to see if object is a global
          const objectName = getObjectName(callee.object);
          if (globalObjects.includes(objectName)) {
            if (!allowInHooks || (!isInReactHook && !isInUseEffect)) {
              context.report({
                node,
                messageId: 'globalListener',
                data: {
                  method: callee.property.name,
                  object: objectName,
                },
              });
            }
          }
        }
      },
    };

    /**
     * Get object name from various expression types
     */
    function getObjectName(node) {
      if (node.type === 'Identifier') {
        return node.name;
      }
      if (node.type === 'MemberExpression') {
        return getObjectName(node.object);
      }
      return null;
    }
  },
};