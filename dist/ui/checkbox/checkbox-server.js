import { jsxs, jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { Icon } from '../../icons/index.js';
import { buildContainerClassName, buildCheckboxClassName, buildCheckmarkClassName, buildLabelClassName } from './helpers.js';

const CheckboxServer = forwardRef(({ variant = 'primary', size = 'medium', labelPosition = 'right', className, children, checked, defaultChecked, ...props }, ref) => {
    const containerClassName = buildContainerClassName(labelPosition, className);
    const checkboxClassName = buildCheckboxClassName(size, variant, checked || defaultChecked || false);
    const checkmarkClassName = buildCheckmarkClassName(size);
    const labelClassName = buildLabelClassName(size);
    return (jsxs("label", { ref: ref, className: containerClassName, children: [jsx("input", { type: "checkbox", className: checkboxClassName, checked: checked, defaultChecked: defaultChecked, ...props }), jsx("div", { className: "checkbox-visual", children: jsx(Icon, { icon: Check, className: checkmarkClassName, "aria-hidden": "true" }) }), children && jsx("span", { className: labelClassName, children: children })] }));
});
CheckboxServer.displayName = 'CheckboxServer';

export { CheckboxServer };
//# sourceMappingURL=checkbox-server.js.map
