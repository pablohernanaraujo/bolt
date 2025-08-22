'use client';
import { X } from 'lucide-react';
import { forwardRef, useCallback, useState } from 'react';
import { InputGroup, InputRightElement } from '../input-group';
import { Input } from './input';
export const InputWithClear = forwardRef(({ onClear, clearIcon, alwaysShowClear = false, value: controlledValue, defaultValue, onChange, variant = 'outline', size = 'medium', isDisabled, hasError, className, style, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const handleChange = useCallback((e) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    }, [isControlled, onChange]);
    const handleClear = useCallback(() => {
        if (!isDisabled) {
            if (!isControlled) {
                setInternalValue('');
            }
            onClear?.();
            const syntheticEvent = {
                target: { value: '' },
                currentTarget: { value: '' },
            };
            onChange?.(syntheticEvent);
        }
    }, [isDisabled, isControlled, onClear, onChange]);
    const showClearButton = alwaysShowClear || (currentValue && String(currentValue).length > 0);
    return (<InputGroup variant={variant} size={size} isDisabled={isDisabled} hasError={hasError}>
        <Input ref={ref} value={currentValue} onChange={handleChange} isDisabled={isDisabled} hasError={hasError} className={typeof className === 'string' ? className : undefined} style={typeof style === 'object' ? style : undefined} {...props}/>
        {showClearButton && !isDisabled && (<InputRightElement isInteractive>
            <button type="button" onClick={handleClear} aria-label="Clear input" tabIndex={-1}>
              {clearIcon || <X size={16}/>}
            </button>
          </InputRightElement>)}
      </InputGroup>);
});
InputWithClear.displayName = 'InputWithClear';
