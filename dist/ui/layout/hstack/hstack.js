import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildHStackClassName } from './helpers.js';

const HStack = forwardRef(({ space = '0', align = 'stretch', justify = 'start', wrap = false, reversed = false, as: Component = 'div', className, children, ...props }, ref) => {
    const hstackClassName = buildHStackClassName({
        space,
        align,
        justify,
        wrap,
        reversed,
        className,
    });
    return (jsx(Component, { ref: ref, className: hstackClassName, ...props, children: children }));
});
HStack.displayName = 'HStack';

export { HStack };
//# sourceMappingURL=hstack.js.map
