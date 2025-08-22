import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { buildBadgeClassName } from './helpers';
export const Badge = forwardRef(({ variant = 'subtle', colorScheme = 'default', size = 'medium', className, children, ...props }, ref) => (_jsx("span", { ref: ref, className: buildBadgeClassName(variant, colorScheme, size, className), ...props, children: children })));
Badge.displayName = 'Badge';
