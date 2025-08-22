'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { TextField } from 'react-aria-components';
import { InputClient } from './input-client';
export const InputField = forwardRef(({ 'aria-label': ariaLabel, isDisabled, isInvalid, ...props }, ref) => (_jsx(TextField, { "aria-label": ariaLabel, isDisabled: isDisabled, isInvalid: isInvalid, children: _jsx(InputClient, { ref: ref, ...props }) })));
InputField.displayName = 'InputField';
