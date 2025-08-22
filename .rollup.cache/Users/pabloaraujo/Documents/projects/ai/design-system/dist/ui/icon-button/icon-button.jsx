'use client';
import { forwardRef } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { buildIconButtonClassName, getIconSize, getIconSizeValue, } from './helpers';
export const IconButton = forwardRef(({ variant = 'primary', size = 'medium', icon: IconComponent, iconSize, className, 'aria-label': ariaLabel, ...props }, ref) => {
    const resolvedIconSize = getIconSize(size, iconSize);
    const iconSizeValue = getIconSizeValue(resolvedIconSize);
    return (<AriaButton ref={ref} aria-label={ariaLabel} className={(renderProps) => buildIconButtonClassName(variant, size, className, {
            ...renderProps,
            defaultClassName: renderProps.defaultClassName || '',
        })} {...props}>
        <IconComponent size={iconSizeValue}/>
      </AriaButton>);
});
IconButton.displayName = 'IconButton';
