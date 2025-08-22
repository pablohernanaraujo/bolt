import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildContentWrapperClassName } from './helpers.js';

const ContentWrapper = forwardRef(({ variant = 'body', paddingX, borderless = false, as: Component = 'div', className, children, ...props }, ref) => {
    const contentWrapperClassName = buildContentWrapperClassName({
        variant,
        paddingX,
        borderless,
        className,
    });
    return (jsx(Component, { ref: ref, className: contentWrapperClassName, ...props, children: children }));
});
ContentWrapper.displayName = 'ContentWrapper';

export { ContentWrapper };
//# sourceMappingURL=content-wrapper.js.map
