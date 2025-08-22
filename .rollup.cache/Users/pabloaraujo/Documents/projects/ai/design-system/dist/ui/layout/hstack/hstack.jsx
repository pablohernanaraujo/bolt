import { forwardRef } from 'react';
import { buildHStackClassName } from './helpers';
export const HStack = forwardRef(({ space = '0', align = 'stretch', justify = 'start', wrap = false, reversed = false, as: Component = 'div', className, children, ...props }, ref) => {
    const hstackClassName = buildHStackClassName({
        space,
        align,
        justify,
        wrap,
        reversed,
        className,
    });
    return (<Component ref={ref} className={hstackClassName} {...props}>
        {children}
      </Component>);
});
HStack.displayName = 'HStack';
