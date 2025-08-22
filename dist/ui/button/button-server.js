import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildButtonClassName } from './helpers.js';

const ButtonServer = forwardRef(({ variant = 'primary', size = 'medium', fullWidth = false, className, type = 'button', children, ...props }, ref) => {
    const buttonClassName = buildButtonClassName(variant, size, fullWidth, className, {
        defaultClassName: '',
        isPressed: false,
        isHovered: false,
        isFocused: false,
        isFocusVisible: false,
        isDisabled: props.disabled || false,
        isPending: false,
    });
    return (jsx("button", { ref: ref, type: type, className: buttonClassName, ...props, children: children }));
});
ButtonServer.displayName = 'ButtonServer';

export { ButtonServer };
//# sourceMappingURL=button-server.js.map
