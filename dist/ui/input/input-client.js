'use client';
import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { Input } from 'react-aria-components';
import '../input-group/input-addons.js';
import '../input-group/input-elements.js';
import '../input-group/input-group.js';
import { useInputGroup } from '../input-group/input-group-context.js';
import { buildInputWithGroupClassName, buildInputClassName } from './helpers.js';

const InputClient = forwardRef(({ variant = 'outline', size = 'medium', hasError = false, type = 'text', className, placeholder, ...props }, ref) => {
    const inputGroup = useInputGroup();
    return (jsx(Input, { ref: ref, type: type, className: (renderProps) => {
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

export { InputClient };
//# sourceMappingURL=input-client.js.map
