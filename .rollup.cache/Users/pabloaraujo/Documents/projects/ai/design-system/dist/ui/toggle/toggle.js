'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Switch as AriaSwitch } from 'react-aria-components';
import { buildContainerClassName, buildLabelClassName, buildThumbClassName, buildTrackClassName, } from './helpers';
export const Toggle = forwardRef(({ variant = 'primary', size = 'medium', labelPosition = 'right', className, children, ...props }, ref) => {
    const renderSwitch = (renderProps) => (_jsxs(_Fragment, { children: [_jsx("div", { className: buildTrackClassName(size, variant, renderProps.isSelected), "data-focused": renderProps.isFocused || undefined, "data-disabled": renderProps.isDisabled || undefined, children: _jsx("div", { className: buildThumbClassName(size, renderProps.isSelected) }) }), children && typeof children !== 'function' && (_jsx("span", { className: buildLabelClassName(size), children: children }))] }));
    const containerClassName = typeof className === 'string' || className === undefined
        ? buildContainerClassName(labelPosition, className)
        : className;
    return (_jsx(AriaSwitch, { ref: ref, className: containerClassName, ...props, children: renderSwitch }));
});
Toggle.displayName = 'Toggle';
