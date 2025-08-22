'use client';
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
    return (<InputGroup variant={variant} size={size} isDisabled={disabled} hasError={hasError}>
        <InputClient ref={ref} type={inputType} placeholder={placeholder} disabled={disabled} hasError={hasError} {...props}/>
        <InputRightElement isInteractive>
          <button type="button" onClick={handleToggleVisibility} onKeyDown={(event) => handleToggleKeyDown(event, handleToggleVisibility)} disabled={disabled} aria-label={toggleAriaLabelText} tabIndex={0} style={{
            background: 'none',
            border: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            color: 'inherit',
        }}>
            <Icon icon={visible ? EyeOff : Eye} size="sm" aria-hidden="true"/>
          </button>
        </InputRightElement>
      </InputGroup>);
});
PasswordInput.displayName = 'PasswordInput';
