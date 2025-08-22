// /eslint-rules/rules/no-global-mutations.js
// ESLint rule to prevent mutations of global objects and prototypes
// Ensures components don't modify global state or built-in prototypes
// RELEVANT FILES: ../index.js, no-global-listeners.js

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent mutations of global objects and prototypes',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          allowedGlobals: {
            type: 'array',
            items: { type: 'string' },
            description: 'Global objects allowed to be mutated',
          },
          allowedProperties: {
            type: 'array',
            items: { type: 'string' },
            description: 'Properties allowed to be mutated',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      globalMutation: 'Mutation of global object "{{object}}" detected. This creates side effects.',
      prototypeMutation: 'Prototype mutation detected on "{{object}}". This affects all instances globally.',
      builtinMutation: 'Mutation of built-in object "{{object}}" detected. This is dangerous and creates global side effects.',
      windowProperty: 'Setting property on window object. This creates global state.',
      documentProperty: 'Mutating document properties. Use React patterns instead.',
    },
  },

  create(context) {
    const options = context.options[0] || {};
    const allowedGlobals = options.allowedGlobals || [];
    const allowedProperties = options.allowedProperties || [];

    /**
     * Global objects that should never be mutated
     */
    const protectedGlobals = [
      'window',
      'document',
      'navigator',
      'location',
      'history',
      'screen',
      'localStorage',
      'sessionStorage',
      'globalThis',
      'self',
      'parent',
      'top',
    ];

    /**
     * Built-in constructors/prototypes that should never be mutated
     */
    const protectedBuiltins = [
      'Object',
      'Array',
      'Function',
      'String',
      'Number',
      'Boolean',
      'Date',
      'RegExp',
      'Error',
      'Promise',
      'Symbol',
      'Map',
      'Set',
      'WeakMap',
      'WeakSet',
    ];

    /**
     * Properties that are commonly safe to set
     */
    const commonSafeProperties = [
      'className',
      'id',
      'value',
      'innerHTML', // Should be avoided but not always a global side effect
      'textContent',
      'style', // When setting specific style properties
    ];

    /**
     * Check if mutation is allowed
     */
    function isMutationAllowed(objectName, propertyName) {
      if (allowedGlobals.includes(objectName)) {
        return true;
      }
      
      if (allowedProperties.includes(propertyName)) {
        return true;
      }

      if (commonSafeProperties.includes(propertyName)) {
        return true;
      }

      return false;
    }

    /**
     * Get object name from member expression
     */
    function getObjectName(node) {
      if (node.type === 'Identifier') {
        return node.name;
      }
      if (node.type === 'MemberExpression') {
        return getObjectName(node.object);
      }
      if (node.type === 'ThisExpression') {
        return 'this';
      }
      return null;
    }

    /**
     * Get property name from member expression
     */
    function getPropertyName(node) {
      if (node.type === 'MemberExpression') {
        if (node.property.type === 'Identifier') {
          return node.property.name;
        }
        if (node.property.type === 'Literal') {
          return node.property.value;
        }
      }
      return null;
    }

    /**
     * Check if we're inside a React component or hook
     */
    function isInReactContext(node) {
      let parent = node.parent;
      while (parent) {
        if (parent.type === 'FunctionDeclaration' || 
            parent.type === 'FunctionExpression' || 
            parent.type === 'ArrowFunctionExpression') {
          const name = parent.id?.name || 
                       (parent.parent?.type === 'VariableDeclarator' ? parent.parent.id?.name : null);
          
          // React component (starts with capital letter) or hook (starts with 'use')
          if (name && (/^[A-Z]/.test(name) || /^use[A-Z]/.test(name))) {
            return true;
          }
        }
        parent = parent.parent;
      }
      return false;
    }

    return {
      // Assignment expressions (obj.prop = value)
      AssignmentExpression(node) {
        if (node.left.type === 'MemberExpression') {
          const objectName = getObjectName(node.left.object);
          const propertyName = getPropertyName(node.left);

          if (!objectName) return;

          // Check if mutation is allowed
          if (isMutationAllowed(objectName, propertyName)) {
            return;
          }

          // Check for global object mutations
          if (protectedGlobals.includes(objectName)) {
            if (objectName === 'window') {
              context.report({
                node,
                messageId: 'windowProperty',
              });
            } else if (objectName === 'document') {
              context.report({
                node,
                messageId: 'documentProperty',
              });
            } else {
              context.report({
                node,
                messageId: 'globalMutation',
                data: { object: objectName },
              });
            }
            return;
          }

          // Check for built-in prototype mutations
          if (protectedBuiltins.includes(objectName)) {
            context.report({
              node,
              messageId: 'builtinMutation',
              data: { object: objectName },
            });
            return;
          }

          // Check for prototype property mutations (obj.prototype.prop = value)
          if (propertyName === 'prototype' || 
              (node.left.object.type === 'MemberExpression' && 
               getPropertyName(node.left.object) === 'prototype')) {
            context.report({
              node,
              messageId: 'prototypeMutation',
              data: { object: objectName },
            });
          }
        }
      },

      // Method calls that mutate (obj.method(...))
      CallExpression(node) {
        if (node.callee.type === 'MemberExpression') {
          const objectName = getObjectName(node.callee.object);
          const methodName = getPropertyName(node.callee);

          if (!objectName || !methodName) return;

          // Methods that commonly mutate global state
          const mutatingMethods = [
            'setAttribute',
            'removeAttribute',
            'appendChild',
            'removeChild',
            'insertBefore',
            'replaceChild',
            'setItem', // localStorage/sessionStorage
            'removeItem',
            'clear',
            'pushState', // history
            'replaceState',
            'go',
            'back',
            'forward',
            'assign', // location
            'replace',
            'reload',
          ];

          if (mutatingMethods.includes(methodName)) {
            if (protectedGlobals.includes(objectName)) {
              context.report({
                node,
                messageId: 'globalMutation',
                data: { object: `${objectName}.${methodName}` },
              });
            }
          }

          // Prototype method mutations
          if (protectedBuiltins.includes(objectName) && methodName === 'defineProperty') {
            context.report({
              node,
              messageId: 'prototypeMutation',
              data: { object: objectName },
            });
          }
        }
      },

      // Object.defineProperty, Object.assign on globals
      CallExpression(node) {
        if (node.callee.type === 'MemberExpression' &&
            node.callee.object.name === 'Object') {
          
          const methodName = node.callee.property.name;
          const mutatingObjectMethods = [
            'defineProperty',
            'defineProperties', 
            'assign',
            'setPrototypeOf',
          ];

          if (mutatingObjectMethods.includes(methodName) && node.arguments.length > 0) {
            const firstArg = node.arguments[0];
            const targetName = getObjectName(firstArg);

            if (targetName && (protectedGlobals.includes(targetName) || protectedBuiltins.includes(targetName))) {
              context.report({
                node,
                messageId: 'globalMutation',
                data: { object: `Object.${methodName}(${targetName})` },
              });
            }
          }
        }
      },
    };
  },
};