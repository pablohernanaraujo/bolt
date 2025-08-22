import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { Icon } from '@/icons';
import { buildCheckboxClassName, buildCheckmarkClassName, buildContainerClassName, buildLabelClassName, } from './helpers';
export const CheckboxServer = forwardRef(({ variant = 'primary', size = 'medium', labelPosition = 'right', className, children, checked, defaultChecked, ...props }, ref) => {
    const containerClassName = buildContainerClassName(labelPosition, className);
    const checkboxClassName = buildCheckboxClassName(size, variant, checked || defaultChecked || false);
    const checkmarkClassName = buildCheckmarkClassName(size);
    const labelClassName = buildLabelClassName(size);
    return (_jsxs("label", { ref: ref, className: containerClassName, children: [_jsx("input", { type: "checkbox", className: checkboxClassName, checked: checked, defaultChecked: defaultChecked, ...props }), _jsx("div", { className: "checkbox-visual", children: _jsx(Icon, { icon: Check, className: checkmarkClassName, "aria-hidden": "true" }) }), children && _jsx("span", { className: labelClassName, children: children })] }));
});
CheckboxServer.displayName = 'CheckboxServer';
