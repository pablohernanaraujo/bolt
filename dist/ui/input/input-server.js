import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { generateFormFieldAccessibility } from '../utils/accessibility.js';
import '../input-group/input-addons.js';
import '../input-group/input-elements.js';
import '../input-group/input-group.js';
import { useInputGroup } from '../input-group/input-group-context.js';
import { buildInputWithGroupClassName, buildInputClassName, isInputInvalid } from './helpers.js';

const InputServer = forwardRef(({ variant = 'outline', size = 'medium', hasError = false, type = 'text', className, placeholder, isDisabled, isInvalid, disabled: htmlDisabled, fieldName, name, required, ...props }, ref) => {
    const inputGroup = useInputGroup();
    const finalDisabled = htmlDisabled ?? isDisabled;
    const invalid = isInputInvalid(hasError, isInvalid);
    const accessibilityAttributes = generateFormFieldAccessibility({
        componentName: 'input',
        fieldName: fieldName || name,
        isRequired: required,
        hasError: invalid,
        isDisabled: finalDisabled,
        isReadOnly: props.readOnly,
    });
    const inputClassName = inputGroup
        ? buildInputWithGroupClassName(variant, size, inputGroup, className)
        : buildInputClassName(variant, size, className);
    return (jsx("input", { ref: ref, type: type, name: name, className: inputClassName, placeholder: placeholder, disabled: finalDisabled, required: required, "aria-invalid": invalid, ...accessibilityAttributes.input, ...props }));
});
InputServer.displayName = 'InputServer';

export { InputServer };
//# sourceMappingURL=input-server.js.map
