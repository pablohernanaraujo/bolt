'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState, } from 'react';
import { buildPinInputClassName, createFieldRefs, getPinValue, isComplete, splitValue, } from './helpers';
import { PinInputContext } from './pin-input-context';
import { hiddenInput, pinInputContainerRecipe } from './pin-input.css';
export const PinInput = ({ length = 4, type = 'numeric', variant = 'outline', size = 'medium', hasError = false, disabled = false, autoFocus = false, masked = false, maskChar = '•', value, defaultValue = '', onChange, onComplete, onFocus, onBlur, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedBy, className, children, }) => {
    const [internalValues, setInternalValues] = useState(() => splitValue(defaultValue, length));
    const isControlled = value !== undefined;
    const currentValues = isControlled
        ? splitValue(value, length)
        : internalValues;
    const fieldRefs = useRef(createFieldRefs(length));
    const hiddenInputRef = useRef(null);
    const setValue = useCallback((index, newValue) => {
        const newValues = [...currentValues];
        newValues[index] = newValue;
        if (!isControlled) {
            setInternalValues(newValues);
        }
        const completeValue = getPinValue(newValues);
        if (hiddenInputRef.current) {
            hiddenInputRef.current.value = completeValue;
        }
        onChange?.(completeValue);
        if (isComplete(newValues)) {
            onComplete?.(completeValue);
        }
    }, [currentValues, isControlled, onChange, onComplete]);
    const focusField = useCallback((index) => {
        const field = fieldRefs.current[index];
        if (field && !disabled) {
            field.focus();
        }
    }, [disabled]);
    const handleFocus = useCallback((index) => {
        onFocus?.(index);
    }, [onFocus]);
    const handleBlur = useCallback((index) => {
        onBlur?.(index);
    }, [onBlur]);
    useEffect(() => {
        if (autoFocus && !disabled) {
            setTimeout(() => {
                focusField(0);
            }, 0);
        }
    }, [autoFocus, disabled, focusField]);
    useEffect(() => {
        if (isControlled) {
            const newValues = splitValue(value, length);
            if (hiddenInputRef.current) {
                hiddenInputRef.current.value = getPinValue(newValues);
            }
        }
    }, [isControlled, value, length]);
    const contextValue = {
        values: currentValues,
        type,
        variant,
        size,
        hasError,
        disabled,
        masked,
        maskChar,
        length,
        fieldRefs,
        setValue,
        focusField,
        handleFocus,
        handleBlur,
    };
    const containerClassName = pinInputContainerRecipe({ size });
    const componentClassName = buildPinInputClassName(variant, size, hasError, disabled, className);
    return (_jsx(PinInputContext.Provider, { value: contextValue, children: _jsxs("div", { className: `${containerClassName} ${componentClassName}`, role: "group", "aria-label": ariaLabel || `PIN input with ${length} digits`, "aria-describedby": ariaDescribedBy, "data-error": hasError || undefined, "data-disabled": disabled || undefined, children: [_jsx("input", { ref: hiddenInputRef, type: "text", name: "pin", defaultValue: getPinValue(currentValues), className: hiddenInput, tabIndex: -1, "aria-hidden": "true", readOnly: true }), children] }) }));
};
PinInput.displayName = 'PinInput';
