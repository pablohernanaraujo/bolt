import { forwardRef, } from 'react';
import { buildButtonClassName } from './helpers';
export const ButtonServer = forwardRef(({ variant = 'primary', size = 'medium', fullWidth = false, className, type = 'button', children, ...props }, ref) => {
    const buttonClassName = buildButtonClassName(variant, size, fullWidth, className, {
        defaultClassName: '',
        isPressed: false,
        isHovered: false,
        isFocused: false,
        isFocusVisible: false,
        isDisabled: props.disabled || false,
        isPending: false,
    });
    return (<button ref={ref} type={type} className={buttonClassName} {...props}>
        {children}
      </button>);
});
ButtonServer.displayName = 'ButtonServer';
