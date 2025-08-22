'use client';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Check } from 'lucide-react';
import { forwardRef } from 'react';
import { Checkbox } from 'react-aria-components';
import { Icon } from '../../icons/index.js';
import { buildContainerClassName, buildCheckboxClassName, buildCheckmarkClassName, buildLabelClassName } from './helpers.js';

const CheckboxClient = forwardRef(({ variant = 'primary', size = 'medium', labelPosition = 'right', className, children, ...props }, ref) => {
    const renderCheckbox = (renderProps) => {
        const { isSelected } = renderProps;
        const resolvedClassName = typeof className === 'function'
            ? className({
                ...renderProps,
                defaultClassName: undefined,
            })
            : className;
        const containerClassName = buildContainerClassName(labelPosition, resolvedClassName);
        const checkboxClassName = buildCheckboxClassName(size, variant, isSelected);
        const checkmarkClassName = buildCheckmarkClassName(size);
        const labelClassName = buildLabelClassName(size);
        return (jsxs("div", { className: containerClassName, children: [jsx("div", { className: checkboxClassName, children: isSelected && (jsx(Icon, { icon: Check, className: checkmarkClassName, "aria-hidden": "true" })) }), children && (jsx("span", { className: labelClassName, children: typeof children === 'function'
                        ? children({
                            ...renderProps,
                            defaultChildren: undefined,
                        })
                        : children }))] }));
    };
    return (jsx(Checkbox, { ref: ref, ...props, children: renderCheckbox }));
});
CheckboxClient.displayName = 'CheckboxClient';

export { CheckboxClient };
//# sourceMappingURL=checkbox-client.js.map
