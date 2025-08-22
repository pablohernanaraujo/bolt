import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildDividerClassName, getDividerAriaOrientation, getDividerRole } from './helpers.js';

const Divider = forwardRef(({ orientation = 'horizontal', variant = 'solid', size = 'thin', spacing = 'medium', className, ...props }, ref) => (jsx("div", { ref: ref, role: getDividerRole(), "aria-orientation": getDividerAriaOrientation(orientation), className: buildDividerClassName(orientation, variant, size, spacing, className), ...props })));
Divider.displayName = 'Divider';

export { Divider };
//# sourceMappingURL=divider.js.map
