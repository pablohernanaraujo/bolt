import { jsxs, jsx } from 'react/jsx-runtime';
import { EyeOff, Eye } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Icon } from '../../icons/index.js';
import '../input-group/input-addons.js';
import { InputRightElement } from '../input-group/input-elements.js';
import { InputGroup } from '../input-group/input-group.js';
import '../input-group/input-group-context.js';
import { InputClient } from '../input/input-client.js';
import { getToggleAriaLabel, handleToggleKeyDown } from './helpers.js';

const PasswordInput = forwardRef(({ variant = 'outline', size = 'medium', hasError = false, defaultVisible = false, isVisible, onVisibilityChange, toggleAriaLabel, placeholder = 'Enter password', disabled, type: _type, ...props }, ref) => {
    const [internalVisible, setInternalVisible] = useState(defaultVisible);
    const isControlled = isVisible !== undefined;
    const visible = isControlled ? isVisible : internalVisible;
    const handleToggleVisibility = () => {
        if (disabled)
            return;
        const newVisible = !visible;
        if (isControlled) {
            onVisibilityChange?.(newVisible);
        }
        else {
            setInternalVisible(newVisible);
        }
    };
    const inputType = visible ? 'text' : 'password';
    const toggleAriaLabelText = getToggleAriaLabel(visible, toggleAriaLabel);
    return (jsxs(InputGroup, { variant: variant, size: size, isDisabled: disabled, hasError: hasError, children: [jsx(InputClient, { ref: ref, type: inputType, placeholder: placeholder, disabled: disabled, hasError: hasError, ...props }), jsx(InputRightElement, { isInteractive: true, children: jsx("button", { type: "button", onClick: handleToggleVisibility, onKeyDown: (event) => handleToggleKeyDown(event, handleToggleVisibility), disabled: disabled, "aria-label": toggleAriaLabelText, tabIndex: 0, style: {
                        background: 'none',
                        border: 'none',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        color: 'inherit',
                    }, children: jsx(Icon, { icon: visible ? EyeOff : Eye, size: "sm", "aria-hidden": "true" }) }) })] }));
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
//# sourceMappingURL=password-input.js.map
