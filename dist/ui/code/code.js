import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildCodeClassName } from './helpers.js';

const Code = forwardRef(({ children, className, ...props }, ref) => {
    const codeClassName = buildCodeClassName(className);
    return (jsx("code", { ref: ref, className: codeClassName, ...props, children: children }));
});
Code.displayName = 'Code';

export { Code };
//# sourceMappingURL=code.js.map
