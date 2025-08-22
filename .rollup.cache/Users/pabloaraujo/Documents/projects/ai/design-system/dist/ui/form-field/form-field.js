'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from 'react';
import { FieldError, Label, Text, TextField } from 'react-aria-components';
import { Input } from '../input';
import * as styles from './form-field.css';
import { buildAriaDescribedBy, buildFormFieldClassName, generateFormFieldIds, hasFormFieldError, } from './helpers';
export const FormField = ({ label, inputProps = {}, hint, error, required = false, children, className, id, isDisabled, isInvalid, ...props }) => {
    const generatedId = useId();
    const ids = generateFormFieldIds(id || generatedId);
    const fieldHasError = hasFormFieldError(error, isInvalid);
    const ariaDescribedBy = buildAriaDescribedBy(ids, Boolean(hint), Boolean(error));
    return (_jsxs(TextField, { id: ids.input, isRequired: required, isDisabled: isDisabled, isInvalid: fieldHasError, className: buildFormFieldClassName(className), ...props, children: [_jsxs(Label, { id: ids.label, className: styles.label, children: [label, required && (_jsx("span", { className: styles.requiredIndicator, "aria-label": "required", children: "*" }))] }), children ? (children) : (_jsx(Input, { ...(() => {
                    const { className: inputClassName, style: inputStyle, ...restProps } = inputProps;
                    return restProps;
                })(), className: typeof inputProps.className === 'string'
                    ? inputProps.className
                    : undefined, style: typeof inputProps.style === 'object' &&
                    inputProps.style !== null &&
                    !('defaultStyle' in inputProps.style)
                    ? inputProps.style
                    : undefined, hasError: fieldHasError, isDisabled: isDisabled, isInvalid: fieldHasError })), hint && !error && (_jsx(Text, { id: ids.hint, slot: "description", className: styles.hint, children: hint })), error && (_jsx(FieldError, { id: ids.error, className: styles.error, children: error }))] }));
};
FormField.displayName = 'FormField';
