'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { RadioGroup as AriaRadioGroup, Label } from 'react-aria-components';
import { buildGroupLabelClassName, buildRadioGroupClassName } from './helpers';
export const RadioGroup = forwardRef(({ variant = 'primary', size = 'medium', orientation = 'vertical', className, children, label, ...props }, ref) => {
    const radioGroupClassName = buildRadioGroupClassName(orientation, typeof className === 'string' ? className : undefined);
    return (_jsxs(AriaRadioGroup, { ref: ref, className: radioGroupClassName, "data-variant": variant, "data-size": size, "data-orientation": orientation, ...props, children: [label && (_jsx(Label, { className: buildGroupLabelClassName(size), children: label })), _jsx("div", { style: {
                    display: 'flex',
                    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
                    gap: orientation === 'horizontal' ? '1rem' : '0.75rem',
                    flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
                }, children: typeof children === 'function' ? children({}) : children })] }));
});
RadioGroup.displayName = 'RadioGroup';
