'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Icon } from '@/icons';
import { InputGroup, InputRightElement } from '../input-group';
import { InputClient } from '../input/input-client';
import { getToggleAriaLabel, handleToggleKeyDown } from './helpers';
export const PasswordInput = forwardRef(({ variant = 'outline', size = 'medium', hasError = false, defaultVisible = false, isVisible, onVisibilityChange, toggleAriaLabel, placeholder = 'Enter password', disabled, type: _type, ...props }, ref) => {
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
    return (_jsxs(InputGroup, { variant: variant, size: size, isDisabled: disabled, hasError: hasError, children: [_jsx(InputClient, { ref: ref, type: inputType, placeholder: placeholder, disabled: disabled, hasError: hasError, ...props }), _jsx(InputRightElement, { isInteractive: true, children: _jsx("button", { type: "button", onClick: handleToggleVisibility, onKeyDown: (event) => handleToggleKeyDown(event, handleToggleVisibility), disabled: disabled, "aria-label": toggleAriaLabelText, tabIndex: 0, style: {
                        background: 'none',
                        border: 'none',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        color: 'inherit',
                    }, children: _jsx(Icon, { icon: visible ? EyeOff : Eye, size: "sm", "aria-hidden": "true" }) }) })] }));
});
PasswordInput.displayName = 'PasswordInput';
