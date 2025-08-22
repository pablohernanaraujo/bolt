import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { Button } from 'react-aria-components';
import { buildIconButtonClassName, getIconSizeValue, getIconSize } from './helpers.js';

const IconButton = forwardRef(({ variant = 'primary', size = 'medium', icon: IconComponent, iconSize, className, 'aria-label': ariaLabel, ...props }, ref) => {
    const resolvedIconSize = getIconSize(size, iconSize);
    const iconSizeValue = getIconSizeValue(resolvedIconSize);
    return (jsx(Button, { ref: ref, "aria-label": ariaLabel, className: (renderProps) => buildIconButtonClassName(variant, size, className, {
            ...renderProps,
            defaultClassName: renderProps.defaultClassName || '',
        }), ...props, children: jsx(IconComponent, { size: iconSizeValue }) }));
});
IconButton.displayName = 'IconButton';

export { IconButton };
//# sourceMappingURL=icon-button.js.map
