import { forwardRef } from 'react';
import { buildContainerClassName } from './helpers';
export const Container = forwardRef(({ paddingY = '6', as: Component = 'div', className, children, ...props }, ref) => {
    const containerClassName = buildContainerClassName({
        paddingY,
        className,
    });
    return (<Component ref={ref} className={containerClassName} {...props}>
        {children}
      </Component>);
});
Container.displayName = 'Container';
