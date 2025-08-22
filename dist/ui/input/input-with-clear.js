import { jsxs, jsx } from 'react/jsx-runtime';
import { X } from 'lucide-react';
import { forwardRef, useState, useCallback } from 'react';
import '../input-group/input-addons.js';
import { InputRightElement } from '../input-group/input-elements.js';
import { InputGroup } from '../input-group/input-group.js';
import '../input-group/input-group-context.js';
import { InputServer } from './input-server.js';

const InputWithClear = forwardRef(({ onClear, clearIcon, alwaysShowClear = false, value: controlledValue, defaultValue, onChange, variant = 'outline', size = 'medium', isDisabled, hasError, className, style, ...props }, ref) => {
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
    return (jsxs(InputGroup, { variant: variant, size: size, isDisabled: isDisabled, hasError: hasError, children: [jsx(InputServer, { ref: ref, value: currentValue, onChange: handleChange, isDisabled: isDisabled, hasError: hasError, className: typeof className === 'string' ? className : undefined, style: typeof style === 'object' ? style : undefined, ...props }), showClearButton && !isDisabled && (jsx(InputRightElement, { isInteractive: true, children: jsx("button", { type: "button", onClick: handleClear, "aria-label": "Clear input", tabIndex: -1, children: clearIcon || jsx(X, { size: 16 }) }) }))] }));
});
InputWithClear.displayName = 'InputWithClear';

export { InputWithClear };
//# sourceMappingURL=input-with-clear.js.map
