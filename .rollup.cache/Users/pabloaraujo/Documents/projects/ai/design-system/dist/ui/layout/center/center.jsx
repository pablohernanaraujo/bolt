import { forwardRef } from 'react';
import { buildCenterClassName } from './helpers';
export const Center = forwardRef(({ as: Component = 'div', className, children, ...props }, ref) => {
    const centerClassName = buildCenterClassName({
        className,
    });
    return (<Component ref={ref} className={centerClassName} {...props}>
        {children}
      </Component>);
});
Center.displayName = 'Center';
