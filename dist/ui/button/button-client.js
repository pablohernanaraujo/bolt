'use client';
import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { Button } from 'react-aria-components';
import { buildButtonClassName } from './helpers.js';

const ButtonClient = forwardRef(({ variant = 'primary', size = 'medium', fullWidth = false, className, ...props }, ref) => (jsx(Button, { ref: ref, className: (renderProps) => buildButtonClassName(variant, size, fullWidth, className, {
        ...renderProps,
        defaultClassName: renderProps.defaultClassName || '',
    }), ...props })));
ButtonClient.displayName = 'ButtonClient';

export { ButtonClient };
//# sourceMappingURL=button-client.js.map
