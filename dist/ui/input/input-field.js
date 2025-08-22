import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { TextField } from 'react-aria-components';
import { InputClient } from './input-client.js';

const InputField = forwardRef(({ 'aria-label': ariaLabel, isDisabled, isInvalid, ...props }, ref) => (jsx(TextField, { "aria-label": ariaLabel, isDisabled: isDisabled, isInvalid: isInvalid, children: jsx(InputClient, { ref: ref, ...props }) })));
InputField.displayName = 'InputField';

export { InputField };
//# sourceMappingURL=input-field.js.map
