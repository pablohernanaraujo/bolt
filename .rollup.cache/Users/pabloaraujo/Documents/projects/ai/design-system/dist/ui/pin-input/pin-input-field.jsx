'use client';
import { forwardRef, useContext, useImperativeHandle, useRef, } from 'react';
import { getDisplayValue, handleCharInput, handleKeyNavigation, handlePasteContent, INPUT_MODES, } from './helpers';
import { PinInputContext } from './pin-input-context';
import { pinInputFieldRecipe } from './pin-input.css';
export const PinInputField = forwardRef(({ index, className }, ref) => {
    const context = useContext(PinInputContext);
    const inputRef = useRef(null);
    if (!context) {
        throw new Error('PinInputField must be used within a PinInput component');
    }
    const { values, type, variant, size, hasError, disabled, masked, maskChar, length, fieldRefs, setValue, focusField, handleFocus, handleBlur, } = context;
    useImperativeHandle(ref, () => inputRef.current, []);
    if (fieldRefs.current) {
        fieldRefs.current[index] = inputRef.current;
    }
    const currentValue = values[index] || '';
    const displayValue = getDisplayValue(currentValue, masked, maskChar);
    const handleKeyDown = (event) => {
        const { key } = event;
        const wasHandled = handleKeyNavigation(key, index, currentValue, length, setValue, focusField);
        if (wasHandled) {
            event.preventDefault();
            return;
        }
        if (key.length === 1) {
            event.preventDefault();
            handleCharInput(key, index, type, length, setValue, focusField);
        }
    };
    const handlePaste = (event) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text');
        if (!pastedData)
            return;
        handlePasteContent(pastedData, index, type, length, setValue, focusField);
    };
    const handleChange = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 1) {
            const char = newValue.slice(-1);
            if (char) {
                handleCharInput(char, index, type, length, setValue, focusField);
            }
            else {
                setValue(index, '');
            }
        }
    };
    const handleInputFocus = (event) => {
        event.target.select();
        handleFocus(index);
    };
    const handleInputBlur = (event) => {
        handleBlur(index);
    };
    const fieldClassName = pinInputFieldRecipe({
        variant,
        size,
    });
    const combinedClassName = className
        ? `${fieldClassName} ${className}`
        : fieldClassName;
    return (<input ref={inputRef} type="text" inputMode={INPUT_MODES[type]} autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck="false" maxLength={1} value={displayValue} disabled={disabled} className={combinedClassName} data-index={index} data-error={hasError || undefined} data-disabled={disabled || undefined} onChange={handleChange} onKeyDown={handleKeyDown} onPaste={handlePaste} onFocus={handleInputFocus} onBlur={handleInputBlur} aria-label={`PIN digit ${index + 1} of ${length}`} role="textbox" aria-invalid={hasError}/>);
});
PinInputField.displayName = 'PinInputField';
