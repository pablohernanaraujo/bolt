import { forwardRef } from 'react';
import { buildFlexClassName } from './helpers';
export const Flex = forwardRef(({ direction = 'row', wrap = 'nowrap', align = 'stretch', justify = 'start', gap = '0', as: Component = 'div', className, children, ...props }, ref) => {
    const flexClassName = buildFlexClassName({
        direction,
        wrap,
        align,
        justify,
        gap,
        className,
    });
    return (<Component ref={ref} className={flexClassName} {...props}>
        {children}
      </Component>);
});
Flex.displayName = 'Flex';
