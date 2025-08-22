import { forwardRef } from 'react';
import { buildContentWrapperClassName } from './helpers';
export const ContentWrapper = forwardRef(({ variant = 'body', paddingX, borderless = false, as: Component = 'div', className, children, ...props }, ref) => {
    const contentWrapperClassName = buildContentWrapperClassName({
        variant,
        paddingX,
        borderless,
        className,
    });
    return (<Component ref={ref} className={contentWrapperClassName} {...props}>
        {children}
      </Component>);
});
ContentWrapper.displayName = 'ContentWrapper';
