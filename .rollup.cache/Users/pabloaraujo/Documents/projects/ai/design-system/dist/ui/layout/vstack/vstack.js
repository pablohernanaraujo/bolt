import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { buildVStackClassName } from './helpers';
export const VStack = forwardRef(({ space = '0', align = 'stretch', justify = 'start', wrap = false, reversed = false, as: Component = 'div', className, children, ...props }, ref) => {
    const vstackClassName = buildVStackClassName({
        space,
        align,
        justify,
        wrap,
        reversed,
        className,
    });
    return (_jsx(Component, { ref: ref, className: vstackClassName, ...props, children: children }));
});
VStack.displayName = 'VStack';
