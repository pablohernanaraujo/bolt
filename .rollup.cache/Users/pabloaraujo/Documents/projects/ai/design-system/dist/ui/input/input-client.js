'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Input as AriaInput } from 'react-aria-components';
import { useInputGroup } from '../input-group';
import { buildInputClassName, buildInputWithGroupClassName } from './helpers';
export const InputClient = forwardRef(({ variant = 'outline', size = 'medium', hasError = false, type = 'text', className, placeholder, ...props }, ref) => {
    const inputGroup = useInputGroup();
    return (_jsx(AriaInput, { ref: ref, type: type, className: (renderProps) => {
            const renderPropsWithDefault = {
                ...renderProps,
                defaultClassName: renderProps.defaultClassName || '',
            };
            return inputGroup
                ? buildInputWithGroupClassName(variant, size, inputGroup, className, renderPropsWithDefault)
                : buildInputClassName(variant, size, className, renderPropsWithDefault);
        }, placeholder: placeholder, ...props }));
});
InputClient.displayName = 'InputClient';
