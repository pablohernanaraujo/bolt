'use strict';
(self.webpackChunkdesign_system = self.webpackChunkdesign_system || []).push([
  [866],
  {
    './node_modules/.pnpm/@mdx-js+react@3.1.0_@types+react@19.1.10_react@19.1.0/node_modules/@mdx-js/react/index.js':
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        (__webpack_require__.r(__webpack_exports__),
          __webpack_require__.d(__webpack_exports__, {
            MDXProvider: () => MDXProvider,
            useMDXComponents: () => useMDXComponents,
          }));
        var react = __webpack_require__(
          './node_modules/.pnpm/next@15.4.6_@babel+core@7.28.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js',
        );
        const emptyComponents = {},
          MDXContext = react.createContext(emptyComponents);
        function useMDXComponents(components) {
          const contextComponents = react.useContext(MDXContext);
          return react.useMemo(
            function () {
              return 'function' == typeof components
                ? components(contextComponents)
                : { ...contextComponents, ...components };
            },
            [contextComponents, components],
          );
        }
        function MDXProvider(properties) {
          let allComponents;
          return (
            (allComponents = properties.disableParentContext
              ? 'function' == typeof properties.components
                ? properties.components(emptyComponents)
                : properties.components || emptyComponents
              : useMDXComponents(properties.components)),
            react.createElement(
              MDXContext.Provider,
              { value: allComponents },
              properties.children,
            )
          );
        }
      },
  },
]);
