import { jsxs, jsx } from 'react/jsx-runtime';
import { useId } from 'react';
import { TextField, Label, Text, FieldError } from 'react-aria-components';
import './../../assets/src/tokens/tokens.css.ts.vanilla-B-MfocZu.css';
import './../../assets/src/ui/input-group/input-group.css.ts.vanilla-sYAVUhux.css';
import '../input/input.css.js';
import { InputServer } from '../input/input-server.js';
import '../input/input-field.js';
import '../input/input-with-clear.js';
import { label, requiredIndicator, hint, error } from './form-field.css.js';
import { buildAriaDescribedBy, buildFormFieldClassName, hasFormFieldError, generateFormFieldIds } from './helpers.js';

const FormField = ({ label: label$1, inputProps = {}, hint: hint$1, error: error$1, required = false, children, className, id, isDisabled, isInvalid, ...props }) => {
    const generatedId = useId();
    const ids = generateFormFieldIds(id || generatedId);
    const fieldHasError = hasFormFieldError(error$1, isInvalid);
    buildAriaDescribedBy(ids, Boolean(hint$1), Boolean(error$1));
    return (jsxs(TextField, { id: ids.input, isRequired: required, isDisabled: isDisabled, isInvalid: fieldHasError, className: buildFormFieldClassName(className), ...props, children: [jsxs(Label, { id: ids.label, className: label, children: [label$1, required && (jsx("span", { className: requiredIndicator, "aria-label": "required", children: "*" }))] }), children ? (children) : (jsx(InputServer, { ...(() => {
                    const { className: inputClassName, style: inputStyle, ...restProps } = inputProps;
                    return restProps;
                })(), className: typeof inputProps.className === 'string'
                    ? inputProps.className
                    : undefined, style: typeof inputProps.style === 'object' &&
                    inputProps.style !== null &&
                    !('defaultStyle' in inputProps.style)
                    ? inputProps.style
                    : undefined, hasError: fieldHasError, isDisabled: isDisabled, isInvalid: fieldHasError })), hint$1 && !error$1 && (jsx(Text, { id: ids.hint, slot: "description", className: hint, children: hint$1 })), error$1 && (jsx(FieldError, { id: ids.error, className: error, children: error$1 }))] }));
};
FormField.displayName = 'FormField';

export { FormField };
//# sourceMappingURL=form-field.js.map
