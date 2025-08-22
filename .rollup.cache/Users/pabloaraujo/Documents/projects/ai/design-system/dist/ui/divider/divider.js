import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { buildDividerClassName, getDividerAriaOrientation, getDividerRole, } from './helpers';
export const Divider = forwardRef(({ orientation = 'horizontal', variant = 'solid', size = 'thin', spacing = 'medium', className, ...props }, ref) => (_jsx("div", { ref: ref, role: getDividerRole(orientation), "aria-orientation": getDividerAriaOrientation(orientation), className: buildDividerClassName(orientation, variant, size, spacing, className), ...props })));
Divider.displayName = 'Divider';
