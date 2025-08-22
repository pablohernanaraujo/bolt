import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildFlexClassName } from './helpers.js';

const Flex = forwardRef(({ direction = 'row', wrap = 'nowrap', align = 'stretch', justify = 'start', gap = '0', as: Component = 'div', className, children, ...props }, ref) => {
    const flexClassName = buildFlexClassName({
        direction,
        wrap,
        align,
        justify,
        gap,
        className,
    });
    return (jsx(Component, { ref: ref, className: flexClassName, ...props, children: children }));
});
Flex.displayName = 'Flex';

export { Flex };
//# sourceMappingURL=flex.js.map
