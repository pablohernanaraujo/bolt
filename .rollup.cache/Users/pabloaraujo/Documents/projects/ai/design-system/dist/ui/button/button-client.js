'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { buildButtonClassName } from './helpers';
export const ButtonClient = forwardRef(({ variant = 'primary', size = 'medium', fullWidth = false, className, ...props }, ref) => (_jsx(AriaButton, { ref: ref, className: (renderProps) => buildButtonClassName(variant, size, fullWidth, className, {
        ...renderProps,
        defaultClassName: renderProps.defaultClassName || '',
    }), ...props })));
ButtonClient.displayName = 'ButtonClient';
