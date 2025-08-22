import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildContainerClassName } from './helpers.js';

const Container = forwardRef(({ paddingY = '6', as: Component = 'div', className, children, ...props }, ref) => {
    const containerClassName = buildContainerClassName({
        paddingY,
        className,
    });
    return (jsx(Component, { ref: ref, className: containerClassName, ...props, children: children }));
});
Container.displayName = 'Container';

export { Container };
//# sourceMappingURL=container.js.map
