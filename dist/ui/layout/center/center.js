import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildCenterClassName } from './helpers.js';

const Center = forwardRef(({ as: Component = 'div', className, children, ...props }, ref) => {
    const centerClassName = buildCenterClassName({
        className,
    });
    return (jsx(Component, { ref: ref, className: centerClassName, ...props, children: children }));
});
Center.displayName = 'Center';

export { Center };
//# sourceMappingURL=center.js.map
