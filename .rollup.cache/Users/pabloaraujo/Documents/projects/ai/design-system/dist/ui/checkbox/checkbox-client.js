'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from 'lucide-react';
import { forwardRef } from 'react';
import { Checkbox as AriaCheckbox } from 'react-aria-components';
import { Icon } from '@/icons';
import { buildCheckboxClassName, buildCheckmarkClassName, buildContainerClassName, buildLabelClassName, } from './helpers';
export const CheckboxClient = forwardRef(({ variant = 'primary', size = 'medium', labelPosition = 'right', className, children, ...props }, ref) => {
    const renderCheckbox = (renderProps) => {
        const { isSelected } = renderProps;
        const resolvedClassName = typeof className === 'function'
            ? className({
                ...renderProps,
                defaultClassName: undefined,
            })
            : className;
        const containerClassName = buildContainerClassName(labelPosition, resolvedClassName);
        const checkboxClassName = buildCheckboxClassName(size, variant, isSelected);
        const checkmarkClassName = buildCheckmarkClassName(size);
        const labelClassName = buildLabelClassName(size);
        return (_jsxs("div", { className: containerClassName, children: [_jsx("div", { className: checkboxClassName, children: isSelected && (_jsx(Icon, { icon: Check, className: checkmarkClassName, "aria-hidden": "true" })) }), children && (_jsx("span", { className: labelClassName, children: typeof children === 'function'
                        ? children({
                            ...renderProps,
                            defaultChildren: undefined,
                        })
                        : children }))] }));
    };
    return (_jsx(AriaCheckbox, { ref: ref, ...props, children: renderCheckbox }));
});
CheckboxClient.displayName = 'CheckboxClient';
