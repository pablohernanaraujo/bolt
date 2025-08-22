import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { buildCenterClassName } from './helpers';
export const Center = forwardRef(({ as: Component = 'div', className, children, ...props }, ref) => {
    const centerClassName = buildCenterClassName({
        className,
    });
    return (_jsx(Component, { ref: ref, className: centerClassName, ...props, children: children }));
});
Center.displayName = 'Center';
