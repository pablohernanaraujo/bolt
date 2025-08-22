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
    return (<Component ref={ref} className={vstackClassName} {...props}>
        {children}
      </Component>);
});
VStack.displayName = 'VStack';
