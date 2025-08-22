'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Radio as AriaRadio } from 'react-aria-components';
import { buildRadioClassName, buildRadioDotClassName, buildRadioLabelClassName, } from './helpers';
export const Radio = forwardRef(({ variant = 'primary', size = 'medium', className, children, value, ...props }, ref) => {
    const renderRadio = (renderProps) => (_jsxs("div", { style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: renderProps.isDisabled ? 'not-allowed' : 'pointer',
        }, children: [_jsx("div", { className: buildRadioClassName(size, variant, renderProps.isSelected), "data-focused": renderProps.isFocused || undefined, "data-disabled": renderProps.isDisabled || undefined, "data-selected": renderProps.isSelected || undefined, children: _jsx("div", { className: buildRadioDotClassName(size, variant) }) }), children && typeof children !== 'function' && (_jsx("span", { className: buildRadioLabelClassName(size), children: children }))] }));
    return (_jsx(AriaRadio, { ref: ref, value: value, className: typeof className === 'string' ? className : undefined, ...props, children: renderRadio }));
});
Radio.displayName = 'Radio';
